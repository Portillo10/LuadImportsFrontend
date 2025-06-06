import Row from "./Row";

type TableProps = {
  columns: { key: string; label: string; class?: string }[];
  rowsData: any[];
  withHeader?: boolean;
  rowClass?: string;
  rowHoverColor?: string;
  onClickRow?: (data: any) => void;
};

const Table: React.FC<TableProps> = ({
  columns,
  rowsData,
  withHeader = true,
  rowClass = "font-medium text-[#E7EBEC]",
  rowHoverColor,
  onClickRow,
}) => {
  return (
    <div className="rounded-xl overflow-hidden border border-[#5A5B60]">
      <table className="w-full bg-[#5a5b60] text-center">
        {withHeader && (
          <thead className="bg-[#232427]">
            <tr className="border-b border-[#5A5B60]">
              {columns.map((col, index) => (
                <th className="py-2 px-2s" key={index}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rowsData.map((row, index) => (
            <Row
              rowClass={rowClass}
              key={index}
              rowData={row}
              columns={columns}
              bgColor={index % 2 == 0 ? "#323338" : "#232427"}
              hoverColor={rowHoverColor}
              onClick={onClickRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
