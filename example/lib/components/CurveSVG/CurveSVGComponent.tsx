import { ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";

import { sizes } from "@/lib/styles";
import { TColors } from "@/lib/types";

type TCurveSVGComponent = {
    styles: ViewStyle;
    colors: TColors;
};

export const CurveSVGComponent: React.FC<TCurveSVGComponent> = ({ styles, colors }) => {
    return (
        <Svg
            width={sizes.svg.width}
            height={sizes.svg.height}
            fill="none"
            style={styles}
        >
            <Path
                fill={colors.primaryColor}
                fillRule="evenodd"
                d="M4.047 0H.8v67.911h76.4V0h-3.247C72.856 18.351 57.627 32.895 39 32.895 20.373 32.895 5.144 18.35 4.047 0Z"
                clipRule="evenodd"
            />
        </Svg>
    );
};
