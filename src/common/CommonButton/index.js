import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./button.css";

const CommonButton = (props) => {
  const { t } = useTranslation();
  const { createNotification } = props;

  return (
    <div className="btn_info">
      <Button className="btnsugar">{t("Gimme_sugar!")}</Button>
    </div>
  );
};


export default CommonButton;
