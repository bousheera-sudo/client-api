import React, { useEffect, useState } from 'react';
import axios from 'axios';

const isProduction = window.location.hostname !== 'localhost';
const defaultApiUrl = isProduction
    ? `${window.location.origin}/api`
    : 'http://localhost:8000/api';

const apiUrl = process.env.REACT_APP_API_URL || defaultApiUrl;

export default function Apiclient() {
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = () => {
            const url = query !== ''
                ? `${apiUrl}/filter?p=${query}`
                : `${apiUrl}/articles`;

            axios.get(url)
                .then(response => {
                    setArticles(response.data);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération :", error);
                });
        };

        fetchArticles();
    }, [query]);

    return (
        <div className="apiclient-container">
            <h1>Be-Beauty API Client</h1>
            <p className="subtitle">Gestion des articles via REST API</p>

            <div className="card">
                <h2>Inventaire des produits (API)</h2>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Rechercher par titre..."
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Visuel</th>
                            <th>Nom du Produit</th>
                            <th>Catégorie</th>
                            <th>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.length > 0 ? (
                            articles.map((article) => (
                                <tr key={article.id}>
                                    <td>
                                        <img
                                            src={article.couverture ? (article.couverture.startsWith('http') ? article.couverture : `${apiUrl.replace('/api', '')}${article.couverture}`) : 'https://via.placeholder.com/50'}
                                            alt={article.titre}
                                            className="thumbnail"
                                        />
                                    </td>
                                    <td><strong>{article.titre}</strong></td>
                                    <td>
                                        <span className="category-tag">{article.categorie}</span>
                                    </td>
                                    <td><span className="price">{article.prix} DH</span></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#888', fontStyle: 'italic' }}>
                                    {query === '' ? "Chargement des produits..." : "Aucun produit trouvé pour \"" + query + "\""}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
