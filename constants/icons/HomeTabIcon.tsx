import React from "react";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

const HomeTabIcon = ({ props }: any) => {
  // küçük, orta, büyük ekran değerleri

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_317_123)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.3464 3.1858C11.7218 2.86157 12.2782 2.86157 12.6536 3.1858L19.0001 8.66681V19C19.0001 20.1046 18.1046 21 17.0001 21H7.00006C5.8955 21 5.00006 20.1046 5.00006 19V8.66673L11.3464 3.1858ZM3.00006 10.394L1.65364 11.5568C1.23565 11.9178 0.604178 11.8716 0.243193 11.4536C-0.117791 11.0356 -0.0715852 10.4042 0.346397 10.0432L10.0392 1.67216C11.1655 0.699449 12.8346 0.699451 13.9609 1.67216L23.6536 10.0432C24.0716 10.4042 24.1178 11.0356 23.7568 11.4536C23.3959 11.8716 22.7644 11.9178 22.3464 11.5568L21.0001 10.3941V19C21.0001 21.2091 19.2092 23 17.0001 23H7.00006C4.79093 23 3.00006 21.2091 3.00006 19V10.394ZM10 15C10 14.4477 10.4477 14 11 14H13C13.5523 14 14 14.4477 14 15V21H10V15Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_317_123">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default HomeTabIcon;
