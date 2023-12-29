import style from "./Footer.module.css";

const Footer = () => {
  const anchorHandler = () => {};

  return (
    <div className={`${style["footer-wrapper"]}`}>
      {/* <p>
				모든 문제에 대한 권리는 프로그래머스에 있으며, 본 사이트는 영리 목적의
				어떠한 행위도 하지 않습니다.
			</p> */}
      {/* <p>
				All questions are properties of Programmers. This website does not make
				any commercial profit.
			</p> */}
      <p>
        본 사이트는 어떠한 상업적 수익을 창출하지 않으며, 문제의 저작권을 비롯한
        문제에 대한 모든 권리는 프로그래머스(㈜그렙)에 있습니다.
      </p>
      <p>
        ⓒ 2023{" "}
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
