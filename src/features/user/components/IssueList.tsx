import IssueCard from "./IssueCard";
import { Button, Pagination } from "antd";
import { LeftOutlined } from "@ant-design/icons";

type IssueListProps = {
  issues: Issue[];
  totalIssue: number;
  pageSize: number;
  currentIssuePage: number;
  handlePageIssueChange: (page: number) => void;
  onBack: () => void;
  onNew: () => void;
};

const IssueList = ({
  issues,
  totalIssue,
  pageSize,
  currentIssuePage,
  handlePageIssueChange,
  onBack,
  onNew,
} : IssueListProps) => {
  return (
    <div className="w-full md:w-[50%] mt-12">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl mb-5">Issues :</h1>
        <div>
          <Button type="primary" onClick={onNew}>
            New issue
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {issues.length > 0
          ? issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)
          : "No issue found"}
      </div>
      {totalIssue > pageSize && (
        <Pagination
          current={currentIssuePage}
          pageSize={pageSize}
          total={totalIssue}
          onChange={handlePageIssueChange}
          className="mt-4"
        />
      )}
      <div className="mt-5">
        <Button type="link" icon={<LeftOutlined />} onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default IssueList;
