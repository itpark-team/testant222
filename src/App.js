import React, {useEffect, useState} from 'react';
import {Modal, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import axios from "axios";

const App = () => {

    let [dataSource, setDataSource] = useState([]);

    const loadTodos = () => {
        axios.get("http://localhost:8080/todos/getAll")
            .then(response => {
                setDataSource(response.data);
            });
    }

    const deleteTodoById = (id) => {
        axios.delete(`http://localhost:8080/todos/deleteById/${id}`)
            .then(response => {
                loadTodos();
            });
    }


    useEffect(() => {
        loadTodos();
    }, []);

    const columns = [
        // {
        //     key: "1",
        //     title: "ID",
        //     dataIndex: "id",
        // },
        {
            key: "2",
            title: "Date",
            dataIndex: "date",
        },
        {
            key: "3",
            title: "Description",
            dataIndex: "description",
        },
        {
            key: "5",
            title: "Actions",
            render: (record) => {
                return (
                    <div>
                        <EditOutlined
                            onClick={() => {
                                //onEditStudent(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteStudent(record);
                            }}
                            style={{color: "red", marginLeft: 12}}
                        />
                    </div>
                );
            },
        }
    ];

    const onDeleteStudent = (record) => {
        Modal.confirm({
            title: "Точно удалить студента?",
            okText: "Да",
            okType: "danger",
            onOk: () => {
                deleteTodoById(record.id);
                //setDataSource(dataSource.filter(student => student.id !== record.id));
            },
        });
    };


    return (
        <div>
            <Table dataSource={dataSource} columns={columns}/>
        </div>
    );
};

export default App;