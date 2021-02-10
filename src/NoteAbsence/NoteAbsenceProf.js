import React from 'react';
import { useContext, useState, useEffect, useRef } from 'react';
import { message, Table, Input, Form } from 'antd';
import NavBar from '../navBar/NavBar';

import NoteAbsenceService from '../services/NoteAbsenceService';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
    }) => {

    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
      if (editing) {
          inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
};


class NoteAbsenceProf extends React.Component{
    
  constructor(props) {
        super(props);
        this.columns = [
          {
            title: 'Id',
            dataIndex: 'id_note_absense',
            key: 'id_note_absence',
            width: '10%',
          },
          {
            title: 'Nom',
            dataIndex: 'utilisateur',
            key: 'utilisateur',
            width: '25%',
            render: utilisateur => utilisateur.nom
          },
          {
            title: 'Prenom',
            dataIndex: 'utilisateur',
            key: 'utilisateur',
            width: '25%',
            render: utilisateur => utilisateur.prenom
          },
          {
            title: 'Note',
            dataIndex: 'note',
            width: '20%',
            editable: true,
          },
          {
            title: 'Absence',
            dataIndex: 'absence',
            width: '20%',
            editable: true,
          },
        ];
        this.state = {
          dataSource: [],
          id_module : this.props.location.state,
        };
    }
    componentDidMount() {
      NoteAbsenceService.getAllNotesAbsenceByModule(this.state.id_module).then((res) => {
        this.setState({dataSource : res.data})
      })
    }
    
    handleSave = (row) => {
        //const newData = [...this.state.dataSource];
        //const index = newData.findIndex((item) => row.key === item.key);
        //const item = newData[index];
        //newData.splice(index, 1, { ...item, ...row });
        NoteAbsenceService.modifierNoteAbsenceByModule(row).then(
            res => {
                if (res.data != null){
                    message.success("Modification bien effectue !!")
                    NoteAbsenceService.getAllNotesAbsenceByModule(this.state.id_module).then(res => this.setState({dataSource : res.data}))
                }
            }
        ).catch(
            error => {
                message.error(error.response)
            }
        )
    };

    render() {
      console.log(this.state.dataSource);
        const components = {
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        };
        const columns = this.columns.map((col) => {
          if (!col.editable) {
            return col;
          }
    
          return {
            ...col,
            onCell: (record) => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: this.handleSave,
            }),
          };
        });
        return (
          <div>
            <NavBar/>
            <Table
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={this.state.dataSource}
              columns={columns}
              rowKey={record => record.id_note_absense}
            />
          </div>
        );
    }
}

export default NoteAbsenceProf;