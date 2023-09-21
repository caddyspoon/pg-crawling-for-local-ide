import style from "./Footer.module.css";

const Footer = () => {
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
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
				architecto consequuntur illum cumque, distinctio inventore, ab neque
				commodi hic porro doloremque maxime. Eveniet aspernatur incidunt officia
				nobis saepe aut voluptate.
			</p>
		</div>
	);
};

export default Footer;
