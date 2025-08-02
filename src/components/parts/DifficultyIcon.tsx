import { getDifficultyLabel } from "@/utils/LabelUtil";
import type { ChartDifficultyType } from "@/consts/Code";
import "./difficultyIcon.css";

export default function DifficultyIcon(props: {
  difficulty: ChartDifficultyType;
}) {
  // 難易度名をクラスに変換（小文字にして一致させる）
  const difficultyClass = getDifficultyLabel(props.difficulty).toLowerCase();

  return (
    <div className={`badge ${difficultyClass}`}>
      <span className="text">{getDifficultyLabel(props.difficulty)}</span>
    </div>
  );
}
