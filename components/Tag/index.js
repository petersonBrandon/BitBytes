import React, { useEffect, useState } from "react";

const WEB_DEV = { title: "WEB DEV", color: "bg-slate-600" };
const JAVASCRIPT = { title: "JAVASCRIPT", color: "bg-amber-300 text-black" };

const Tag = (props) => {
  const [tagColor, setTagColor] = useState();

  useEffect(() => {
    switch (props.title.toUpperCase()) {
      case WEB_DEV.title:
        setTagColor(WEB_DEV.color);
        break;
      case JAVASCRIPT.title:
        setTagColor(JAVASCRIPT.color);
        break;

      default:
        setTagColor(WEB_DEV.color);
        break;
    }
  }, [props.title]);
  return <div className={`p-2 ${tagColor} m-1 rounded-lg`}>{props.title}</div>;
};

export default Tag;
