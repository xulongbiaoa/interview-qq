import React, { Component } from 'react';

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';

import { saveAs } from 'file-saver';
import { Button, Input, message, Upload } from 'antd';
import * as XLSX from 'xlsx';
const App = class App extends React.Component {
  state: any;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fileList: [],
    };
  }
  getData = async (ele, callback?) => {
    return new Promise((resolve, reject) => {
      const result: any = [];
      const names: any[] = [];
      ele.files.forEach((item, index) => {
        const reader = new FileReader();
        console.log(ele.files[index].name, 1111);
        names.push(ele.files[index].name);
        reader.readAsBinaryString(
          ele.files[index]?.originFileObj
            ? ele.files[index]?.originFileObj
            : ele.files[index],
        );
        reader.onerror = function (evt) {
          console.log('error reading file', evt);
          alert('error reading file' + evt);
        };
        reader.onload = (evt: any) => {
          try {
            result.push(evt.target.result);
            if (result.length === ele.files.length) {
              callback({ target: { result } }, names);
            }

            resolve(1);
          } catch (error) {
            console.log(error);
            reject(1);
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          }
        };
      });
    });
  };
  generateDocument = async () => {
    const origin: any = document.getElementById('origin');
    if (!this.state.data || this.state.fileList.length === 0) {
      message.error('请确认数据或者模板已上传');
      return;
    }
    await this.getData({ files: [origin.files[0]] }, (evt) => {
      const workbook = XLSX.read(evt.target.result[0], { type: 'binary' });
      let data = []; // 存储获取到的数据
      // 遍历每张工作表进行读取（这里默认只读取第一张表）
      for (const sheet in workbook.Sheets) {
        if (Object.prototype.hasOwnProperty.call(workbook.Sheets, sheet)) {
          //这是关键的一步，hasOwnPropert要从Object的原型中调用
          // 利用 sheet_to_json 方法将 excel 转成 json 数据
          data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          // break; // 如果只取第一张表，就取消注释这行
        }
      }
      const mid = data.length / 2;
      this.setState({ data: [data.slice(0, mid), data.slice(mid + 1)] });
    });
    await this.getData({ files: this.state.fileList }, (evt, names) => {
      const result = new PizZip();
      const outs = result.folder('result');
      this.state?.data[0].forEach((item, index) => {
        if (!evt.target.result[index]) {
          return;
        }
        const zip = new PizZip(evt.target.result[index]);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        doc.setData({
          prePeopleFee:
            Number(this.state?.data[0][index]['人员人工'])?.toFixed(2) ||
            '0.00',
          preDirectFee:
            Number(this.state?.data[0][index]['直接投入'])?.toFixed(2) ||
            '0.00',
          preLongFee:
            Number(this.state?.data[0][index]['折旧摊销'])?.toFixed(2) ||
            '0.00',
          preOtherFee:
            Number(this.state?.data[0][index]['其他费用'])?.toFixed(2) ||
            '0.00',
          preMount:
            Number(this.state?.data[0][index]['内部研发费总额'])?.toFixed(2) ||
            '0.00',
          infactPeopleFee:
            Number(this.state?.data[1][index]['人员人工'])?.toFixed(2) ||
            '0.00',
          infactDirectFee:
            Number(this.state?.data[1][index]['直接投入'])?.toFixed(2) ||
            '0.00',
          infactLongFee:
            Number(this.state?.data[1][index]['折旧摊销'])?.toFixed(2) ||
            '0.00',
          infactOtherFee:
            Number(this.state?.data[1][index]['其他费用'])?.toFixed(2) ||
            '0.00',
          infactMount:
            Number(this.state?.data[1][index]['内部研发费总额'])?.toFixed(2) ||
            '0.00',
        });
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }); //Output the document using Data-URI

        saveAs(out, names[index]);
      });

      console.log(outs, 111);
    });
  };
  render() {
    return (
      <div
        className="App"
        style={{
          display: 'flex',
          width: '100%',
          height: '500px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <div>
            选择数据源(xlsx) :
            <Input
              accept="xlsx"
              style={{ width: 200, marginLeft: 30 }}
              id="origin"
              type={'file'}
            ></Input>
          </div>
          <div style={{ marginBottom: 20, marginTop: 20 }}>
            选择模版文件(docx) :
            <Upload
              onChange={(info) => {
                this.setState({ fileList: info.fileList });
              }}
              directory
              id="doc"
              beforeUpload={() => false}
              fileList={this.state.fileList}
            >
              <Button style={{ marginLeft: 10 }}>上传文件夹</Button>
            </Upload>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={this.generateDocument}>
              生成文档
            </Button>
          </div>
        </div>
      </div>
    );
  }
};
export default App;
