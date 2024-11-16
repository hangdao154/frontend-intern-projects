import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from 'react';

interface Props {
  showColSettings: boolean,
  handleShowColSettings: (state: boolean) => void
  headers: Array<string>,
  colsToDisplay: string[],
  handleSetColsToDisplay: (cols: string[]) => void,
  maxSelection: number
}


export default function CheckboxComponent(props: Props) {
  const { showColSettings, headers, handleShowColSettings, colsToDisplay, handleSetColsToDisplay, maxSelection } = props;

  const [applyColsToDisplay, setApplyColsToDisplay] = useState<string[]>(colsToDisplay)
  const [disabledList, setDisabledList] = useState<string[]>(colsToDisplay.length >= 4 ? headers.filter(item => !colsToDisplay.includes(item)) : [])

  function camelCaseToWords(s: string) {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  const handleAddCol = (name: string) => {
    setApplyColsToDisplay(prev => {
      const newCols: string[] = [...prev, name];

      if (newCols.length >= maxSelection) {
        const newDisabledList = headers.filter(item => !newCols.includes(item));
        setDisabledList(newDisabledList);
      }

      return newCols;
    });
  }

  const handleDeleteCol = (name: string) => {
    setApplyColsToDisplay(prev => {
      const newCols: string[] = prev.filter(item => item !== name);

      if (newCols.length < maxSelection) {
        setDisabledList([]);
      }

      return newCols;
    });
  }

  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      handleAddCol(String(e.target.name));
    } else {
      handleDeleteCol(String(e.target.name));
    }
  }

  if (showColSettings) {
    return (
      <div className="container cols-setting popup">
        <img src="src/assets/x-button.png" className="escape-btn sm-icon" onClick={() => {
          handleShowColSettings(false);
        }} />
        <h2>Column Setting</h2>

        <div className="checkbox-group">
          <Checkbox checked={true} disabled={true}>No</Checkbox>
          {headers.map((header, index) => (
            <Checkbox key={index} name={header} onChange={onChange}
              disabled={disabledList.includes(header) ? true : false}
              checked={applyColsToDisplay.includes(header) ? true : false}>
              {camelCaseToWords(header)}
            </Checkbox>
          ))}
        </div>


        <div className="warning">
          <img style={{ margin: "0 10px 0 0" }} className="inline-icon sm-icon" src="src/assets/warning-icon.png" />
          <p style={{ color: "#4E5464", display: "inline" }}><b style={{ color: "red" }}>NOTE: </b>You can select up to 5 columns</p>
        </div>

        <button onClick={() => {
          handleSetColsToDisplay(applyColsToDisplay);
          handleShowColSettings(false);
        }}>Apply</button>
      </div>
    )
  }

  return <></>

}
