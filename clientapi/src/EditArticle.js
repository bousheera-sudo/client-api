import React, { useState } from 'react';
import axios from 'axios';

export default function EditArticle() {
    const [id, setId] = useState('');
    const [titre, setTitre] = useState('');
    const [categorie, setCategorie] = useState('');
    const [couverture, setCouverture] = useState('');
    const [message, setMessage] = useState('');

    const modifierArticle = () => {
        if (id === '') {
            setMessage('Veuillez spécifier l\'ID de l\'article à modifier.');
            return;
        }

        const isProduction = window.location.hostname !== 'localhost';
        const defaultApiUrl = isProduction
            ? `${window.location.origin}/api`
            : 'http://localhost:8000/api';

        const apiUrl = process.env.REACT_APP_API_URL || defaultApiUrl;
        axios.put(`${apiUrl}/articles/${id}`, {
            titre,
            categorie,
            couverture,
        })
            .then(response => {
                setMessage(response.data.message);
                setId('');
                setTitre('');
                setCategorie('');
                setCouverture('');
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de l'article :", error);
                setMessage('Une erreur est survenue lors de la mise à jour de l\'article.');
            });
    };

    return (
        <div>
            <h1>Modifier un Article</h1>
            <input
                type="text"
                placeholder="ID de l'article"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Titre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Catégorie"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
            />
            <input
                type="text"
                placeholder="Couverture"
                value={couverture}
                onChange={(e) => setCouverture(e.target.value)}
            />
            <button onClick={modifierArticle}>Modifier</button>
            {message && <p>{message}</p>}
        </div>
    );
}
