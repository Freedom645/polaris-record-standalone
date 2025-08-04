import { ClearStatus } from "@/consts/Code";
import { getClearStatusLabel } from "@/utils/LabelUtil";
import React from "react";
import "./ClearStatusBadge.css";

interface ClearStatusBadgeProps {
  type: ClearStatus;
  className?: string;
}

const ClassMap: Record<ClearStatus, string> = {
  [ClearStatus.ALL_PERFECT]: "all-perfect",
  [ClearStatus.FULL_COMBO]: "full-combo",
  [ClearStatus.SUCCESS]: "success",
  [ClearStatus.GOOD_TRY]: "good-try",
  [ClearStatus.NO_PLAY]: "no-play",
} as const;

export const ClearStatusBadge: React.FC<ClearStatusBadgeProps> = ({
  type,
  className,
}) => {
  return (
    <span className={`clear-status-badge ${ClassMap[type]} ${className ?? ""}`}>
      {getClearStatusLabel(type)}
    </span>
  );
};
