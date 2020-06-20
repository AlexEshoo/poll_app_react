import Popover from "react-bootstrap/Popover";
import LogInForm from "./LogInForm";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import React from "react";

function LoginRegisterPopoverButton() {

    return (
        <OverlayTrigger
            trigger="click"
            placement="bottom"
            rootClose={true}
            overlay={
                <Popover id="login-popover">
                    <Popover.Content>
                        <LogInForm/>
                    </Popover.Content>
                </Popover>
            }>
            <Button>
                LOGIN
            </Button>
        </OverlayTrigger>
    )
}

export default LoginRegisterPopoverButton;
