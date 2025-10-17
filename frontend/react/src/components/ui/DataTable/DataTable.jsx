// DataTable.jsx - Simple version
import React from 'react';
import './DataTable.scss';

const DataTable = ({ title, data, columns, emptyMessage = "Không có dữ liệu" }) => {
  return (
    <div className="data-table">
      {title && <h3 className="table-title">{title}</h3>}
      
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} style={{ width: column.width }}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="empty-cell">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>
                      {column.render 
                        ? column.render(row[column.key], row)
                        : row[column.key]
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;