import { PageHeader, Button } from "antd";
import React, { SyntheticEvent } from "react";
import "./index.styles.css";

interface HeaderProps {
  onGoBackPress?: () => any;
  showExtraButton?: boolean;
  onExtraButtonPress?: (event: SyntheticEvent) => any;
}

const Header = ({
  onGoBackPress,
  onExtraButtonPress,
  showExtraButton,
}: HeaderProps) => {
  return (
    <header>
      <PageHeader
        ghost={false}
        className="header"
        title="Todo app challenge"
        onBack={onGoBackPress || undefined}
        extra={[
          showExtraButton && onExtraButtonPress && (
            <Button key="1" type="primary" onClick={onExtraButtonPress}>
              Logout
            </Button>
          ),
        ]}
      ></PageHeader>
    </header>
  );
};

export default Header;
