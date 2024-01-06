import style from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={`${style["footer-wrapper"]}`}>
      <p>
        본 사이트는 어떠한 상업적 수익을 창출하지 않으며, 연습 문제의 저작권을
        비롯한 코딩테스트 연습 문제에 대한 모든 권리는 프로그래머스(㈜그렙)에
        있습니다.
      </p>
      <p>
        ⓒ 2023-2024{" "}
        <span>
          <a
            href="https://github.com/caddyspoon"
            target="_blank"
            rel="noopener noreferrer"
          >
            Caddyspoon
          </a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
