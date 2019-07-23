import * as React from "react";
import styled from "styled-components";

import { FormStateContext } from "./context/context";

export interface FormProps {
  style?: React.CSSProperties;
  name?: string;
  id?: string;
  className?: string;
  render?: (context: any) => React.ReactNode;
  onChange?: (state) => void;
  onSubmit?: (state) => void;
}

export interface FormState {
  FormState: object;
}

class Form extends React.Component<FormProps, FormState> {
  state = { FormState: {} };
  update = (key, value) => {
    this.setState({ FormState: { ...this.state.FormState, [key]: value } });
    this.props.onChange &&
      this.props.onChange({
        FormState: { ...this.state.FormState, [key]: value }
      });
  };
  getContent = () => {
    if (this.props.render) {
      return this.props.render(this.state);
    }
    if (typeof this.props.children === "function") {
      return this.props.children(this.state);
    }
    return this.props.children;
  };
  onChange = e => {
    console.log(e);
    console.log(e.target);
  };
  render() {
    return (
      <form onChange={this.onChange} method="POST" {...this.props} noValidate>
        <FormStateContext.Provider
          value={{ ...this.state, update: this.update }}
        >
          {this.getContent()}
        </FormStateContext.Provider>
      </form>
    );
  }
}

export default Form;
