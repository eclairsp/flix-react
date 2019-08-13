import React from "react"
import "./loading-animation.css"

const LoadingAnimation = props => {
    return(
        <section className="loader-wrapper">
                    <svg className="loader" data-name="Layer 1" version="1.1" viewBox="0 0 695.07 581.27" xmlns="http://www.w3.org/2000/svg" cc="http://creativecommons.org/ns#" dc="http://purl.org/dc/elements/1.1/" rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xlink="http://www.w3.org/1999/xlink">
                        <defs>
                        <linearGradient id="a" x1="727.96" x2="727.96" y1="757.2" y2="618.07" gradientUnits="userSpaceOnUse">
                        <stop stopColor="gray" stopOpacity=".25" offset="0"/>
                        <stop stopColor="gray" stopOpacity=".12" offset=".54"/>
                        <stop stopColor="gray" stopOpacity=".1" offset="1"/>
                        </linearGradient>
                        <linearGradient id="h" x1="463.13" x2="463.13" y1="554.16" y2="196.77" gradientTransform="translate(-200.69,-113.03)" href="#a"/>
                        <linearGradient id="e" x1="615.25" x2="615.25" y1="738.75" y2="213.88" gradientTransform="translate(-352.81,-213.88)" href="#a"/>
                        <linearGradient id="f" x1="979.26" x2="979.26" y1="510.07" y2="351.98" href="#a"/>
                        <clipPath id="g" transform="translate(-152.12 -100.85)">
                        <path d="m1031.1 373.43-6.77-16.49-90.27 37.06a11.15 11.15 0 0 0-6.91 10.31v97.53h17.83v-93.03z" fill="#f2f2f2" data-name="Clipping Path"/>
                        </clipPath>
                        <linearGradient id="d" x1="787.61" x2="787.61" y1="694.3" y2="384" href="#a"/>
                        <linearGradient id="c" x1="727.96" x2="727.96" y1="757.2" y2="618.07" gradientTransform="translate(-352.81,-213.88)" gradientUnits="userSpaceOnUse" href="#a"/>
                        <linearGradient id="b" x1="787.2" x2="787.2" y1="576.01" y2="477.17" gradientTransform="translate(-200.69,-113.03)" gradientUnits="userSpaceOnUse">
                        <stop stopOpacity=".12" offset="0"/>
                        <stop stopOpacity=".09" offset=".55"/>
                        <stop stopOpacity=".02" offset="1"/>
                        </linearGradient>
                        </defs>
                        <title>movie night</title>
                        <path className={props.animation ? "loader-bottom-up" : ""} d="m225.43 421.45s76.92 163.27 299.44 111.86c0 0-23.55-20.41 0-47.88l-186.41-81.24z" fill="url(#c)"/>
                        <path className={props.animation ? "loader-bottom-up" : ""} d="m232.53 423.94s73.27 155.52 285.24 106.54c0 0-22.43-19.44 0-45.61l-177.58-77.38z" fill="#ff5252"/>
                        <circle className={props.animation ? "loader-top-in" : ""} cx="262.44" cy="262.44" r="178.7" fill="url(#h)"/>
                        <circle className={props.animation ? "loader-top-in" : ""} cx="262.44" cy="262.44" r="171.23" fill="#ff5252"/>
                        <path className={props.animation ? "loader-side-in-left" : ""} d="m262.44 0c-144.94 0-262.44 117.5-262.44 262.44s117.5 262.44 262.44 262.44 262.44-117.5 262.44-262.44-117.5-262.44-262.44-262.44zm95.57 137.05a60.8 60.8 0 1 1-22.26 83.07 60.8 60.8 0 0 1 22.26-83.06zm-191.14 250.77a60.8 60.8 0 1 1 22.25-83.05 60.8 60.8 0 0 1-22.25 83.05zm22.25-167.7a60.8 60.8 0 1 1-22.25-83.05 60.8 60.8 0 0 1 22.25 83.05zm73.31 248.58a60.8 60.8 0 1 1 60.8-60.8 60.8 60.8 0 0 1-60.79 60.79zm-38.47-209.34a38.48 38.48 0 1 1 38.48 38.48 38.48 38.48 0 0 1-38.48-38.48zm38.48-81.58a60.8 60.8 0 1 1 60.8-60.8 60.8 60.8 0 0 1-60.8 60.8zm178.62 187.78a60.8 60.8 0 1 1-22.25-83.05 60.8 60.8 0 0 1 22.25 83.05z" fill="url(#e)"/>
                        <path className={props.animation ? "loader-side-in-left" : ""} d="m262.44 7.48c-140.81 0-255 114.15-255 255s114.15 255 255 255 255-114.15 255-255-114.19-255-255-255zm92.85 133.15a59.07 59.07 0 1 1-21.62 80.69 59.07 59.07 0 0 1 21.61-80.69zm-185.7 243.62a59.07 59.07 0 1 1 21.6-80.69 59.07 59.07 0 0 1-21.6 80.69zm21.6-162.94a59.07 59.07 0 1 1-21.62-80.69 59.07 59.07 0 0 1 21.62 80.69zm71.23 241.5a59.07 59.07 0 1 1 59.07-59.07 59.07 59.07 0 0 1-59.05 59.08zm-37.37-203.36a37.38 37.38 0 1 1 37.38 37.38 37.38 37.38 0 0 1-37.38-37.38zm37.38-79.25a59.07 59.07 0 1 1 59.07-59.08 59.07 59.07 0 0 1-59.06 59.07zm173.54 182.43a59.07 59.07 0 1 1-21.62-80.69 59.07 59.07 0 0 1 21.62 80.69z" fill="#e6e6e6"/>
                        <path className={props.animation ? "loader-side-in-left" : ""} d="m24.68 277.39c0-140.81 114.15-255 255-255a253.79 253.79 0 0 1 148.18 47.47 253.93 253.93 0 0 0-165.38-60.93c-140.81 0-255 114.15-255 255a254.63 254.63 0 0 0 106.78 207.49 254.38 254.38 0 0 1-89.58-194.03z" fill="#fff" opacity=".2"/>
                        <circle className={props.animation ? "loader-side-in-left" : ""} cx="262.44" cy="259.44" r="42.99" fill="none" opacity=".2" stroke="#fff" strokeMiterlimit="10" strokeWidth="13"/>
                        <g transform="translate(-200.69,-113.03)" data-name="Group">
                        <path transform="translate(-152.12,-100.85)" d="m1035.7 373.86-9.1-21.87-96.45 39.61a11.91 11.91 0 0 0-7.38 11v104.23l27.87 3.24v-99.43z" fill="url(#f)"/>
                        </g>
                        <path d="m678.31 159.55-6.77-16.49-90.27 37.06a11.15 11.15 0 0 0-6.91 10.31v97.53h17.83v-93.03z" fill="#f2f2f2" data-name="Clipping Path"/>
                        <g transform="translate(-200.69,-113.03)" clipPath="url(#g)" fill="#ff5252">
                        <rect transform="rotate(-90,812.83,447.29)" x="929.6" y="390.87" width="19.44" height="61.57"/>
                        <rect transform="rotate(-90 812.84 474.02)" x="929.6" y="417.61" width="19.44" height="61.57"/>
                        <rect transform="rotate(-90 812.84 500.76)" x="929.6" y="444.34" width="19.44" height="61.57"/>
                        </g>
                        <polygon transform="translate(-200.69,-113.03)" points="679.45 418.12 694.22 418.12 724.29 694.3 853.56 694.3 880.29 416.5 895.76 416.5 895.76 384 679.45 384" fill="url(#d)"/>
                        <polygon transform="translate(-200.69,-113.03)" points="699.7 396.96 873.89 396.96 847.96 688.63 728.87 688.63" fill="#ff5252"/>
                        <rect className={props.animation ? "loader-tip" : ""} x="486.86" y="279.07" width="199.3" height="19.44" fill="#ff5252"/>
                        <circle cx="586.51" cy="413.56" r="49.42" fill="url(#b)"/>
                        <circle cx="586.51" cy="413.56" r="45.37" fill="#fff"/>
                        <rect x="573.18" y="249.65" width="20.072" height="21.188" fill="#ff5252" strokeWidth=".88063"/>
                        <rect x="573.18" y="194.81" width="20.072" height="21.188" fill="#ff5252" strokeWidth=".88063"/>
                        <rect x="573.18" y="222.2" width="20.072" height="21.188" fill="#ff5252" strokeWidth=".88063"/>
                        <rect transform="rotate(-22.2)" x="488.95" y="384.38" width="20.072" height="21.188" fill="#ff5252" strokeWidth=".88063"/>
                        <rect transform="rotate(-22.2)" x="519.48" y="386.49" width="20.072" height="21.188" fill="#ff5252" strokeWidth=".88063"/>
                        <rect transform="rotate(-22.2)" x="547.63" y="386.19" width="20.072" height="21.188" fill="#ff5252" strokeWidth=".88063"/>
                    </svg>
                    <h1 className="loader-head color-orange">
                        {props.message}
                    </h1>
                </section>
    )
}

export default LoadingAnimation;