from urllib.request import urlopen
from bs4 import BeautifulSoup as bs

question_num = 118668

# language =  javascript | python3
language = 'javascript'

# Users can customize their TAB_SIZE who select language JavaScript.
TAB_SIZE = 4
TAB_STR = ' ' * TAB_SIZE


# Crawling by BS4
def get_soup(question_num=question_num, language=language):
    # Open HTML by Address
    URL = f"https://school.programmers.co.kr/learn/courses/30/lessons/{question_num}?language={language}"
    html = urlopen(URL)

    return bs(html, "html.parser", from_encoding="utf-8")


def make_test_case_string(soup):
    # Step 1. Get Test Cases
    qdiv = soup.find('div', {'id': 'tour2'}).find('div').find('div').find('table')

    # Step 1-1. Get Test Case Params' Names
    q_params = qdiv.find('thead').find_all('th')

    param_arr = []
    for param in q_params:
        param_arr.append(param.text)
    joined_param_text = ', '.join(param_arr[:-1])

    # Step 1-2. Get Test Cases
    q_test_cases = qdiv.find('tbody').find_all('tr')

    test_case_arr = []
    for test_case in q_test_cases:
        crnt_str = ', '.join(list(map(lambda x : x.text, test_case.find_all('td'))))
        test_case_arr.append(crnt_str)

    test_case_string = make_test_case_string_by_language_type(test_case_arr)

    return {
        'param_arr': param_arr,
        'joined_param_text': joined_param_text,
        'test_case_arr': test_case_arr,
        'test_case_string': test_case_string,
    }


def make_test_case_string_by_language_type(test_case_arr, language=language):
    if language in ['python3', 'javascript']:
        test_case_string = ', '.join([f'[{test_case_str}]' for test_case_str in test_case_arr])

        if language == 'python3':
            test_case_string = f'test_cases = [{test_case_string}]'
        elif language == 'javascript':
            test_case_string = f'const testCases = [{test_case_string}];'

        return test_case_string


# Step 1-3. Now let's make the codes that check if you make right codes.
def make_verdict_function_text(language=language):
    if language == 'python3':
        return f'def verdict(case_no, result, your_answer):\n{TAB_STR}print(f\'테스트 케이스 #{{str(case_no+1).zfill(2)}}번\')\n{TAB_STR}if result == your_answer:\n{TAB_STR*2}print(\'정답입니다!\')\n{TAB_STR}else:\n{TAB_STR*2}print(f\'실행한 결괏값 {{your_answer}}이(가) 기댓값 {{result}}와(과) 다릅니다.\')'

    elif language == 'javascript':
        return f'const verdict = (caseNo, result, yourAnswer) => {{\n{TAB_STR}console.log(`테스트 케이스 #${{String(caseNo+1).padStart(2, \'0\')}}번`);\n{TAB_STR}if (result === yourAnswer) {{\n{TAB_STR*2}console.log(\'정답입니다!\');\n{TAB_STR}}} else {{\n{TAB_STR*2}console.log(`실행한 결괏값 ${{yourAnswer}}이(가) 기댓값 ${{result}}와(과) 다릅니다.`);\n{TAB_STR}}}\n}};'


def combine_test_case_code(test_case_info, string_function_verdict):
    param_arr = test_case_info['param_arr']
    joined_param_text = test_case_info['joined_param_text']
    test_case_string = test_case_info['test_case_string']

    string_test_case_arr = []
    for idx in range(len(param_arr)):
        param = param_arr[idx]
        string_test_case_arr.append(param)

    # Set test cases to string by language type that user selected
    string_loop_and_test_case = make_string_loop_and_test_case_by_language_type(string_test_case_arr, joined_param_text)

    return '\n\n'.join([string_function_verdict, test_case_string, string_loop_and_test_case])


def make_notice_print_area(language=language):
    if language == 'python3':
        return f'{TAB_STR}if case_no > 0:\n{TAB_STR}{TAB_STR}print(\'\')'
    elif language == 'javascript':
        return f'{TAB_STR}if (caseNo > 0) {{\n{TAB_STR}{TAB_STR}console.log("");\n{TAB_STR}}}'


def make_string_loop_and_test_case_by_language_type(string_test_case_arr, joined_param_text, language=language):
    if language == 'python3':
        string_test_case_joined = ''
        for idx, param in enumerate(string_test_case_arr):
            string_test_case_joined = '\n'.join([string_test_case_joined, f'{TAB_STR}{param} = test_case[{idx}]'])
        
        make_blank_row = make_notice_print_area()
        string_test_case_joined = '\n\n'.join([string_test_case_joined, make_blank_row])

        string_test_case_joined = '\n\n'.join([string_test_case_joined, f'{TAB_STR}your_result = solution({joined_param_text})', ])
        string_test_case_joined = '\n'.join([string_test_case_joined, f'{TAB_STR}verdict(case_no, your_result, result)'])

        return f'for case_no, test_case in enumerate(test_cases):{string_test_case_joined}'

    elif language == 'javascript':
        string_test_case_joined = ''
        for idx, param in enumerate(string_test_case_arr):
            string_test_case_joined = '\n'.join([string_test_case_joined, f'{TAB_STR}const {param} = testCase[{idx}];'])
        
        make_blank_row = make_notice_print_area()
        string_test_case_joined = '\n\n'.join([string_test_case_joined, make_blank_row])

        string_test_case_joined = '\n\n'.join([string_test_case_joined, f'{TAB_STR}const yourResult = solution({joined_param_text});', ])
        string_test_case_joined = '\n'.join([string_test_case_joined, f'{TAB_STR}verdict(caseNo, yourResult, result);\n}}'])

        return f'testCases.forEach((testCase, caseNo) => {{{TAB_STR}{string_test_case_joined});'


# Step 2. Get initial Solution Function
def get_raw_solution_code_text(soup):
    return str(soup.find('div', {'id': 'tour3'}).find('input').get('value'))


def make_complete_below_code_text(raw_solution_code_text, complete_below_code_text, language=language):
    if language == 'python3':
        string_caution = '\"\"\"\n하단 코드를 제외하고 제출하시기 바랍니다.\n\"\"\"'
    elif language == 'javascript':
        string_caution = '/*\n * 하단 코드를 제외하고 제출하시기 바랍니다.\n */'

    return '\n\n\n'.join([raw_solution_code_text, string_caution, complete_below_code_text])


def make_our_world_colourful(question_num=question_num, language=language):
    soup = get_soup(question_num, language)
    test_case_info = make_test_case_string(soup)
    string_function_verdict = make_verdict_function_text()
    complete_below_code_text = combine_test_case_code(test_case_info, string_function_verdict)
    raw_solution_code_text = get_raw_solution_code_text(soup)

    return make_complete_below_code_text(raw_solution_code_text, complete_below_code_text)


print(make_our_world_colourful())