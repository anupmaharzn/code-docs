import { useTypeSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment } from "react";
const CellList: React.FC = () => {
  const cells = useTypeSelector((state) => {
    return state.cells?.order.map((id) => {
      return state.cells?.data[id];
    });
  });

  const renderedCells = cells?.map((cell: any) => (
    <Fragment key={cell?.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));
  return (
    <div>
      <AddCell forceVisable={cells?.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
