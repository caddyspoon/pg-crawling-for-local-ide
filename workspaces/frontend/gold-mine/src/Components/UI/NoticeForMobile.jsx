import style from "./NoticeForMobile.module.css";

import { useEffect } from "react";

const NoticeForMobile = () => {
	function setScreenSize() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	}
	useEffect(() => {
		setScreenSize();
	});

	return (
		<div className={style["mobile-notice-wrapper"]}>
			<div className={style["mobile-notice-main"]}>
				<div className={style["caution-exclamation-mark"]}>
					<p>❗</p>
				</div>

				<p>죄송합니다. 현재 모바일 환경은 지원하지 않습니다.</p>
				<p>PC에서 접근해주시기 바랍니다.</p>
				<br />
				<p className={style["service-name"]}>바틀비. 코드 필경사</p>
			</div>
		</div>
	);
};

export default NoticeForMobile;
