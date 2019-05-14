import * as React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import { Fonts } from "../styles";
import {
  ColorProperty,
  WidthProperty,
  BorderRadiusProperty,
  FontWeightProperty,
  BackgroundColorProperty,
  PaddingProperty
} from "csstype";

export interface SubmitButtonProps {
  backgroundColor?: BackgroundColorProperty;
  fontWeight?: FontWeightProperty;
  color?: ColorProperty;
  width?: WidthProperty<string | number>;
  borderRadius?: BorderRadiusProperty<string | number>;
  padding?: PaddingProperty<string | number>;
}

const SubmitButton: React.SFC<SubmitButtonProps> = props => {
  const Wrapper = styled.div`
    width: ${props.width || "10%"};
    margin: 1em auto;
    background-color: ${props.backgroundColor || "#0994CC"};
    border-radius: ${props.borderRadius || "0.3em"};
  `;
  const styles = {
    cursor: "pointer",
    width: "100%",
    color: props.color || "white",
    fontWeight: props.fontWeight || "bold",
    padding: props.padding || "0.3em",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    fontFamily: Fonts.standard
  };

  const [spring, set] = useSpring(() => ({
    transform: "scale(1)"
  }));

  const onMouseDown = e => {
    set({ transform: "scale(0.9)" });
  };
  const onMouseUp = e => {
    set({ transform: "scale(1)" });
  };
  return (
    <Wrapper onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <animated.button
        {...props}
        aria-label="submit"
        style={{ ...styles, ...spring }}
      >
        {props.children}
      </animated.button>
    </Wrapper>
  );
};

export default SubmitButton;
