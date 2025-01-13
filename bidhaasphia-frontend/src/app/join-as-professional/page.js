'use client';

import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import axiosInstance from '../utils/axiosInstance';

export default function JoinAsProfessionalPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    profession: '',
    bio: '',
    profilePicture: null, // Initial profile picture state
  });

  const [message, setMessage] = useState({ text: '', type: '' }); // State for success/error messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData(prevState => ({
        ...prevState,
        profilePicture: e.target.files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages before submitting the form
    setMessage({ text: '', type: '' });

    // FormData to handle file upload
    const form = new FormData();
    form.append('fullName', formData.fullName);
    form.append('email', formData.email);
    form.append('phoneNumber', formData.phoneNumber);
    form.append('profession', formData.profession);
    form.append('bio', formData.bio);

    // If there's a profile picture, append it
    if (formData.profilePicture) {
      form.append('profilePicture', formData.profilePicture);
    }

    try {
      // Send the form data to the backend API using axios
      const response = await axiosInstance.post('/professionals', form, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });

      // Success message
      setMessage({
        text: 'Form submitted successfully! Your application is under review.',
        type: 'success',
      });

      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        profession: '',
        bio: '',
        profilePicture: null, // Reset profile picture state
      });
    } catch (error) {
      // Error handling: Display error message
      setMessage({
        text: 'There was an error submitting your form. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-purple-600 text-center">Join as a Professional</h1>

      {/* Display success or error message */}
      {message.text && (
        <div
          className={`p-4 mb-6 text-white rounded-md ${
            message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {message.text}
        </div>
      )}

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Professional Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="profession">Profession</Label>
              <Input
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="profilePicture">Profile Picture (Optional)</Label>
              <Input
                id="profilePicture"
                name="profilePicture"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
