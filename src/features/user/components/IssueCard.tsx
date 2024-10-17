import { differenceInDays } from "date-fns";

type IssueCardProps = {
  issue: Issue;
};

const IssueCard = ({ issue }: IssueCardProps) => {
  return (
    <button className="flex justify-between cursor-pointer">
      <div>{issue.title.substring(0, 20)}</div>
      <div>{`${differenceInDays(new Date(), new Date(issue.createdAt))} days ago by ${issue?.author?.login}`}</div>
    </button>
  );
};

export default IssueCard;
