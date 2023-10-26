import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import ReactDataTables from "../components/ReactDataTables";
import "datatables.net-dt/css/jquery.dataTables.css";

const Universitas = () => {
    const history = useHistory();
    const [universitas, setUniversitas] = useState([]);
    const [username, setUsername] = useState("");
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Check if the 'username' exists in localStorage
        const user = localStorage.getItem('username');
        setUsername(user)
        if (!user) {
            // If the 'username' doesn't exist, redirect to the login page
            history.replace('/');
        } else {
            // If the 'username' exists, fetch user data
            fetchData();
        }
    });

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://universities.hipolabs.com/search?country=Indonesia`);
            const universitiesWithId = res.data.map((university, index) => ({
                ...university,
                id: index + 1,
            }));

            setUniversitas(universitiesWithId);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const columns = [
        {
            title: "No",
            data: "id"
        },
        {
            title: "Nama Universitas",
            data: "name"
        },
        {
            title: "Website",
            data: "web_pages",
            render: (val, i, row) => {
                return val[0]
            }
        },
    ];

    const handleLogout = () => {
        history.replace('/')
        localStorage.removeItem("username")
        console.log('User logged out');
    };

    const openModal = (university) => {
        console.log(university, "u")
        setSelectedUniversity(university);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUniversity(null);
        setIsModalOpen(false);
    };


    return (
        <div className="container">
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div style={{ marginBottom: 50 }}>
                        <Button variant="danger" onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt /> Logout
                        </Button>
                    </div>
                </div>
                <div>
                    <h1>Welcome, {username}</h1>
                </div>
                <ReactDataTables
                    data={universitas}
                    columns={columns}
                    onRowClick={(row) => openModal(row)}
                />
                <Modal show={isModalOpen} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Universitas Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedUniversity && (
                            <div>
                                <p>Nama Universitas: {selectedUniversity.name}</p>
                                <p>Website: {selectedUniversity.web_pages[0]}</p>
                            </div>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default Universitas;