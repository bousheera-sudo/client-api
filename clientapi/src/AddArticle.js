import React, { useState } from 'react';
import axios from 'axios';

export default function AddArticle() {
    const [titre, setTitre] = useState('');
    const [categorie, setCategorie] = useState('');
    const [prix, setPrix] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const ajouterArticle = () => {
        if (!titre || !categorie || !prix) {
            setMessage({ text: 'Veuillez remplir les champs obligatoires (*).', type: 'error' });
            return;
        }

        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('categorie', categorie);
        formData.append('prix', prix);
        formData.append('description', description);
        if (image) {
            formData.append('couverture', image);
        }

        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

        axios.post(`${apiUrl}/articles`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                setMessage({ text: response.data.message, type: 'success' });
                setTitre('');
                setCategorie('');
                setPrix('');
                setDescription('');
                setImage(null);
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout :", error);
                setMessage({ text: 'Une erreur est survenue lors de l\'ajout.', type: 'error' });
            });
    };

    return (
        <div className="card">
            <h2>Ajouter un nouveau produit (API + Upload)</h2>

            <input
                type="text"
                placeholder="Titre du produit *"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
            />

            <input
                type="text"
                placeholder="Catégorie (Visage, Cheveux...) *"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
            />

            <input
                type="number"
                placeholder="Prix (DH) *"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
            />

            <label className="upload-label">Image du produit :</label>
            <div className="file-input-wrapper">
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div>

            <textarea
                placeholder="Description du produit"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button onClick={ajouterArticle}>TÉLÉCHARGER ET ENREGISTRER</button>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
}
