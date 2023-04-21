import { useTypeSelector } from "./use-typed-selector";
export const useCumulativeCode = (cellId: string) => {
  return useTypeSelector((state: any) => {
    const { data, order } = state.cells;
    const orderdCells = order.map((id: any) => data[id]);
    //show function to display in preview window
    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
       var show = (value)=>{
        const root =  document.querySelector('#root');
       
        if(typeof value === 'object'){
          if(value.$$typeof && value.props){
            _ReactDOM.render(value,root);
          }else{
            root.innerHTML = JSON.stringify(value);
          }
        }
        else{
          root.innerHTML = value;
        }
      }`;

    const showFuncNoop = "var show = ()=>{}";

    const cumulativeCode = [];
    for (let c of orderdCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join("\n"); //arry of code string  to -> string
};
