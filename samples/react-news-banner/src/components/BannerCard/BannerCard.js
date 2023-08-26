/* tslint:disable */
import { format, parseISO } from "date-fns";
import React from "react";
import styles from "./BannerCard.module.scss";
export var BannerCard = function (props) {
    var item = props.item, isSelected = props.isSelected;
    var _date = format(parseISO(item.publishedDate), "PPPP");
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: isSelected ? styles.documentCardSeleted : styles.documentCard, onClick: function () {
                props.onSeletedItem(item);
            } },
            React.createElement("div", { className: styles.subTitleNews }, _date),
            React.createElement("div", { className: styles.description }, item.description))));
};
//# sourceMappingURL=BannerCard.js.map