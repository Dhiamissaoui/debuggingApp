import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UserProfile = ({ user, onUpdateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: user.name,
        email: user.email,
        age: user.age
    });

    const handleEdit = () => {
        setIsEditing(true);
        setEditForm({
            name: user.name,
            email: user.email,
            age: user.age
        });
    };

    const handleSave = () => {
        // Fixed: Add form validation
        if (!editForm.name.trim()) {
            alert('Name is required');
            return;
        }
        if (!editForm.email.trim() || !editForm.email.includes('@')) {
            alert('Valid email is required');
            return;
        }
        if (editForm.age < 0 || editForm.age > 150) {
            alert('Age must be between 0 and 150');
            return;
        }

        onUpdateUser('name', editForm.name.trim());
        onUpdateUser('email', editForm.email.trim());
        onUpdateUser('age', editForm.age);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditForm({
            name: user.name,
            email: user.email,
            age: user.age
        });
    };

    const handleInputChange = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            {isEditing ? (
                <div className="edit-form">
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Age:</label>
                        <input
                            type="number"
                            value={editForm.age}
                            onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                        />
                    </div>
                    <div className="form-actions">
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="user-info">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Age:</strong> {user.age}</p>
                    <button onClick={handleEdit}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

// Fixed: Added prop validation
UserProfile.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired
    }).isRequired,
    onUpdateUser: PropTypes.func.isRequired
};

export default UserProfile;
