export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    icon: string;
    black: string;
    white: string;
    status: {
      success: string;
      warning: string;
      error: string;
      information: string;
      disabled: string;
      inProgress: string;
    };
  };
}
