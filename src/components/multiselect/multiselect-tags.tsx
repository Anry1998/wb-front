type MultiselectTagsProps = {
  data: { id: number; name: string }[];
  maxNum: number;
  type?: string;
};

function MultiselectTags({
  data,
  maxNum,
  type,
}: MultiselectTagsProps): JSX.Element {
  const length = data.length;
  const excess = length > maxNum ? length - maxNum : 0;
  return (
    <>
      {data.slice(0, maxNum).map((val) => (
        <div
          className={`${
            type === "companies"
              ? "text-purple-925"
              : "bg-purple-100 p-1 rounded-md"
          } `}
          key={`${val.id}`}
        >
          {val.name}
        </div>
      ))}
      {excess > 0 && (
        <>
          {maxNum !== 0 && <span className="text-solitude-200">...</span>}
          <div className="px-2 py-1 rounded-sm bg-purple-50 text-[14px] font-normal">
            {excess}
          </div>
        </>
      )}
    </>
  );
}

export default MultiselectTags;
