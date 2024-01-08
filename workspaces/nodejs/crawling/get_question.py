import sys
from urllib.request import urlopen

import json
from bs4 import BeautifulSoup as bs

# Default Value Setup
# question_number -> 118668: 코딩테스트 연습
default_question_number = 118668
# language =  javascript | python3
default_language = 'javascript'

# Users can customize their TAB_SIZE who select language JavaScript.
TAB_SIZE = 4
TAB_STR = ' ' * TAB_SIZE

LANGUAGE_TYPE = {
    'python3': 'Python3',
    'javascript': 'JavaScript'
}

# Crawling by BS4
def get_soup(question_number, language=""):
    language_param = ""
    if language:
        language_param = f'?language={language}'
    # Open HTML by Address
    URL = f"https://school.programmers.co.kr/learn/courses/30/lessons/{question_number}{language_param}"
    html = urlopen(URL)

    return bs(html, "html.parser", from_encoding="utf-8")


def get_question_name(soup):
    return soup.find('ul', {'id': 'tab'}).find('li').text.strip()


def make_test_case_string(soup, language):
    # Step 1. Get Test Cases
    q_paraent_table = soup.find('h5', string='입출력 예')
    if not q_paraent_table:
        q_paraent_table = soup.find('h5', string='Example')
    target_qdiv = q_paraent_table.find_next('table')

    # Step 1-1. Get Test Case Params' Names
    q_params = target_qdiv.find('thead').find_all('th')

    param_arr = []
    for param in q_params:
        param_arr.append(param.text)
    joined_param_text = ', '.join(param_arr[:-1])

    # Step 1-2. Get Test Cases
    q_test_cases = target_qdiv.find('tbody').find_all('tr')

    test_case_arr = []
    for test_case in q_test_cases:
        crnt_str = ', '.join(
            list(map(lambda x: x.text, test_case.find_all('td'))))
        test_case_arr.append(crnt_str)

    test_case_string = make_test_case_string_by_language_type(
        test_case_arr, language)

    return {
        'param_arr': param_arr,
        'joined_param_text': joined_param_text,
        'test_case_arr': test_case_arr,
        'test_case_string': test_case_string,
    }


def make_test_case_string_by_language_type(test_case_arr, language):
    if language in ['python3', 'javascript']:

        if language == 'python3':
            for i in range(len(test_case_arr)):
                test_case_arr[i] = test_case_arr[i].replace('true', 'True')
                test_case_arr[i] = test_case_arr[i].replace('false', 'False')

        test_case_string = ', '.join(
            [f'[{test_case_str}]' for test_case_str in test_case_arr])

        if language == 'python3':
            test_case_string = f'test_cases = [{test_case_string}]'
        elif language == 'javascript':
            test_case_string = f'const testCases = [{test_case_string}];'

        return test_case_string


# Step 1-3. Now let's make the codes that check if you make right codes.
def make_verdict_function_text(language):
    if language == 'python3':
        return f'def verdict(case_no, result, your_answer):\n{TAB_STR}print(f\'테스트 케이스 #{{str(case_no+1).zfill(2)}}번\')\n{TAB_STR}if result == your_answer:\n{TAB_STR*2}print(\'정답입니다!\')\n{TAB_STR}else:\n{TAB_STR*2}print(f\'실행한 결괏값 {{your_answer}}이(가) 기댓값 {{result}}와(과) 다릅니다.\')'

    elif language == 'javascript':
        return f'const verdict = (caseNo, result, yourAnswer) => {{\n{TAB_STR}console.log(`테스트 케이스 #${{String(caseNo+1).padStart(2, \'0\')}}번`);\n{TAB_STR}if (result === yourAnswer) {{\n{TAB_STR*2}console.log(\'정답입니다!\');\n{TAB_STR}}} else {{\n{TAB_STR*2}console.log(`실행한 결괏값 ${{yourAnswer}}이(가) 기댓값 ${{result}}와(과) 다릅니다.`);\n{TAB_STR}}}\n}};'


def combine_test_case_code(test_case_info, string_function_verdict, language):
    param_arr = test_case_info['param_arr']
    joined_param_text = test_case_info['joined_param_text']
    test_case_string = test_case_info['test_case_string']

    string_test_case_arr = []
    for idx in range(len(param_arr)):
        if idx == len(param_arr) - 1:
            string_test_case_arr.append("result")
        else:
            param = param_arr[idx]
            string_test_case_arr.append(param)

    # Set test cases to string by language type that user selected
    string_loop_and_test_case = make_string_loop_and_test_case_by_language_type(
        string_test_case_arr, joined_param_text, language)

    return '\n\n'.join([string_function_verdict, test_case_string, string_loop_and_test_case])


def make_notice_print_area(language):
    if language == 'python3':
        return f'{TAB_STR}if case_no > 0:\n{TAB_STR}{TAB_STR}print(\'\')'
    elif language == 'javascript':
        return f'{TAB_STR}if (caseNo > 0) {{\n{TAB_STR}{TAB_STR}console.log("");\n{TAB_STR}}}'


def make_string_loop_and_test_case_by_language_type(string_test_case_arr, joined_param_text, language):
    if language == 'python3':
        string_test_case_joined = ''
        for idx, param in enumerate(string_test_case_arr):
            string_test_case_joined = '\n'.join(
                [string_test_case_joined, f'{TAB_STR}{param} = test_case[{idx}]'])

        make_blank_row = make_notice_print_area(language)
        string_test_case_joined = '\n\n'.join(
            [string_test_case_joined, make_blank_row])

        string_test_case_joined = '\n\n'.join(
            [string_test_case_joined, f'{TAB_STR}your_result = solution({joined_param_text})', ])
        string_test_case_joined = '\n'.join(
            [string_test_case_joined, f'{TAB_STR}verdict(case_no, result, your_result)'])

        return f'for case_no, test_case in enumerate(test_cases):{string_test_case_joined}'

    elif language == 'javascript':
        string_test_case_joined = ''
        for idx, param in enumerate(string_test_case_arr):
            string_test_case_joined = '\n'.join(
                [string_test_case_joined, f'{TAB_STR}const {param} = testCase[{idx}];'])

        make_blank_row = make_notice_print_area(language)
        string_test_case_joined = '\n\n'.join(
            [string_test_case_joined, make_blank_row])

        string_test_case_joined = '\n\n'.join(
            [string_test_case_joined, f'{TAB_STR}const yourResult = solution({joined_param_text});', ])
        string_test_case_joined = '\n'.join(
            [string_test_case_joined, f'{TAB_STR}verdict(caseNo, result, yourResult);\n}}'])

        return f'testCases.forEach((testCase, caseNo) => {{{TAB_STR}{string_test_case_joined});'


# Step 2. Get initial Solution Function
def get_raw_solution_code_text(soup):
    return str(soup.find('div', {'id': 'tour3'}).find('input').get('value'))


def make_complete_below_code_text(raw_solution_code_text, complete_below_code_text, language):
    if language == 'python3':
        string_caution = '\"\"\"\n하단 코드를 제외하고 제출하시기 바랍니다.\n\"\"\"'
    elif language == 'javascript':
        string_caution = '/*\n * 하단 코드를 제외하고 제출하시기 바랍니다.\n */'

    return '\n\n\n'.join([raw_solution_code_text, string_caution, complete_below_code_text])


def make_our_world_colourful(language=default_language, question_number=default_question_number):
    try:
        soup = get_soup(question_number, language)
        available_languages = soup.find('div', {'id': 'tour7'}).find_all('a', {'class': 'dropdown-item'})

        language_arr = []
        for lan in available_languages:
            language_arr.append(lan.text)

        if LANGUAGE_TYPE[language] not in language_arr:
            error_type = 'LANGUAGE NOT AVAILABLE'
            throw_error(error_type)
            return

    except:
        error_type = 'QUESTION NOT EXIST'
        throw_error(error_type)
        return

    try:
        question_name = get_question_name(soup)
        test_case_info = make_test_case_string(soup, language)
        string_function_verdict = make_verdict_function_text(language)
        complete_below_code_text = combine_test_case_code(
            test_case_info, string_function_verdict, language)
        raw_solution_code_text = get_raw_solution_code_text(soup)

        return {
            'status': 'success',
            'data': {
                'title': question_name,
                'questionCode': make_complete_below_code_text(raw_solution_code_text, complete_below_code_text, language)
            }}
    except:
        error_type = 'CRAWLING ERROR'
        throw_error(error_type)


def what_colour_is_it(question_number):
    # TODO: 없는 페이지일 때 어떻게 나오는지 확인할 것
    try:
        soup = get_soup(question_number)
        available_languages = soup.find('div', {'id': 'tour7'}).find_all('a', {'class': 'dropdown-item'})

        language_arr = []
        for lan in available_languages:
            language_arr.append(lan.text)

        # FIXME: HARDCODING BELOW
        if 'JavaScript' not in language_arr or 'Python3' not in language_arr:
            error_type = 'LANGUAGE NOT AVAILABLE'
            throw_error(error_type)
            return


    except:
        error_type = 'QUESTION NOT EXIST'
        throw_error(error_type)
        return
    question_name = get_question_name(soup)

    result_info = {
        'status': 'success',
        'data': {
            'title': question_name,
        }}
    json_res = json.dumps(result_info)
    print(json_res)


def main(selected_language, question_number):
    result_info = make_our_world_colourful(
        selected_language, question_number)
    if result_info:
        json_res = json.dumps(result_info)
        print(json_res)


def throw_error(message):
    error_info = {
        'status': 'failed',
        'message': message
    }

    json_res = json.dumps(error_info)
    print(json_res)


if __name__ == '__main__':
    # is_name_only = sys.argv[1]
    # selected_language = sys.argv[2]
    # question_number = sys.argv[3]

    # Code for a test
    is_name_only = 'N'
    selected_language = 'python3'
    question_number = '258712'

    if is_name_only == 'Y':
        what_colour_is_it(question_number)
    elif is_name_only == 'N':
        main(selected_language, question_number)
