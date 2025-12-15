import React, { useState, useEffect } from 'react';
import { useAuth } from './authcontext'; // Adjust path as needed
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminCalendar = () => {
    const { user, token } = useAuth(); // Assuming auth context provides token
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Check for success status from URL (redirect from backend)
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('status') === 'success') {
            toast.success("Google Calendar Linked Successfully!");
            // Clean URL
            navigate('/admin/calendar', { replace: true });
        }
    }, [location, navigate]);

    const fetchEvents = React.useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const apiBaseUrl = process.env.REACT_APP_API_URL || 'https://content-guru-gpls.onrender.com';
            const response = await fetch(`${apiBaseUrl}/google/calendar/events`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            } else {
                // If 400/401, maybe not linked or token expired
                console.log("Failed to fetch events");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (user && (user.role === 'admin' || user.role === 'Admin')) {
            fetchEvents();
        }
    }, [user, token, fetchEvents]);

    const handleLinkCalendar = async () => {
        try {
            const apiBaseUrl = process.env.REACT_APP_API_URL || 'https://content-guru-gpls.onrender.com';
            const response = await fetch(`${apiBaseUrl}/google/login`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.authorization_url) {
                window.location.href = data.authorization_url;
            } else {
                toast.error("Failed to initiate linking");
            }
        } catch (error) {
            toast.error("Error connecting to server");
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const eventData = {
            summary: formData.get('summary'),
            description: formData.get('description'),
            start_time: formData.get('start_time'),
            end_time: formData.get('end_time'),
        };

        try {
            const apiBaseUrl = process.env.REACT_APP_API_URL || 'https://content-guru-gpls.onrender.com';
            const response = await fetch(`${apiBaseUrl}/google/calendar/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(eventData)
            });

            if (response.ok) {
                toast.success("Event created!");
                fetchEvents();
                e.target.reset();
            } else {
                toast.error("Failed to create event");
            }
        } catch (error) {
            toast.error("Error creating event");
        }
    };

    if (!user || (user.role !== 'admin' && user.role !== 'Admin')) {
        return <div className="p-10 text-center">Access Denied. Admins only.</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Content Planning Calendar</h1>

            <div className="mb-8">
                <button
                    onClick={handleLinkCalendar}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Link / Re-link Google Calendar
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Create Event Form */}
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Plan New Content</h2>
                    <form onSubmit={handleCreateEvent} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Event Title</label>
                            <input name="summary" required className="w-full border p-2 rounded" placeholder="e.g. New Blog Post Release" />
                        </div>
                        <div>
                            <label className="block text-gray-700">Description</label>
                            <textarea name="description" className="w-full border p-2 rounded" placeholder="Details..."></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">Start Time</label>
                                <input type="datetime-local" name="start_time" required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block text-gray-700">End Time</label>
                                <input type="datetime-local" name="end_time" required className="w-full border p-2 rounded" />
                            </div>
                        </div>
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700">
                            Add to Calendar
                        </button>
                    </form>
                </div>

                {/* Event List */}
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                    {loading ? <p>Loading events...</p> : (
                        events.length === 0 ? <p className="text-gray-500">No upcoming events found or not connected.</p> : (
                            <ul className="space-y-3">
                                {events.map(event => (
                                    <li key={event.id} className="border-b pb-2">
                                        <div className="font-bold">{event.summary}</div>
                                        <div className="text-sm text-gray-600">
                                            {event.start.dateTime ? new Date(event.start.dateTime).toLocaleString() : event.start.date}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCalendar;
