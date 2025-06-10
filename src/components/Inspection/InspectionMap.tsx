import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { InspectionDueDate } from '../../types/inspectionTypes';
import 'leaflet/dist/leaflet.css';

// Use default marker icon

interface InspectionMapProps {
    inspections: InspectionDueDate[];
}

interface Coordinates {
    lat: number;
    lng: number;
}

// Custom marker icons
const createCustomIcon = (color: string) => new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="${color}" stroke="#000000" stroke-width="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="3" fill="white"/>
        </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const unscheduledIcon = createCustomIcon('#FF4444'); // Red for unscheduled
const scheduledIcon = createCustomIcon('#44FF44'); // Green for scheduled

// Define regional coordinates
const regionalCoordinates: Record<string, Coordinates> = {
    'LONDON': { lat: 51.5074, lng: -0.1278 },
    'SOUTH': { lat: 50.9097, lng: -1.4044 },   // Southampton area
    'SOUTH EAST': { lat: 51.1295, lng: 0.3089 },  // Kent area
    'SOUTH WEST': { lat: 50.7184, lng: -3.5339 }  // Exeter area
};

// Helper to determine region from postcode prefix
const getRegionFromPostcode = (postcode: string): string => {
    const prefix = postcode.substring(0, 2).toUpperCase();
    
    // London postcodes
    if (['E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC'].includes(prefix)) {
        return 'LONDON';
    }
    // South East postcodes
    if (['BN', 'CT', 'DA', 'ME', 'RH', 'TN'].includes(prefix)) {
        return 'SOUTH EAST';
    }
    // South West postcodes
    if (['BA', 'BS', 'DT', 'EX', 'PL', 'TA', 'TQ', 'TR'].includes(prefix)) {
        return 'SOUTH WEST';
    }
    // Default to South
    return 'SOUTH';
};

const InspectionMap: React.FC<InspectionMapProps> = ({ inspections }) => {
    const [coordinates, setCoordinates] = React.useState<Map<string, Coordinates>>(new Map());
    const [isLoading, setIsLoading] = React.useState(true);
    
    React.useEffect(() => {
        const validInspections = inspections.filter(i => i.postcode && i.postcode.trim());
        console.log('Valid inspections:', validInspections);
        
        if (validInspections.length === 0) {
            setIsLoading(false);
            return;
        }

        const coordMap = new Map<string, Coordinates>();
        
        // Add a small random offset to prevent markers from stacking exactly on top of each other
        validInspections.forEach(inspection => {
            const region = getRegionFromPostcode(inspection.postcode);
            const baseCoords = regionalCoordinates[region];
            
            // Add a small random offset (approximately within a 5km radius)
            const offset = 0.05; // roughly 5km in degrees
            const randomLat = (Math.random() - 0.5) * offset;
            const randomLng = (Math.random() - 0.5) * offset;
            
            coordMap.set(inspection.postcode, {
                lat: baseCoords.lat + randomLat,
                lng: baseCoords.lng + randomLng
            });
        });
        
        setCoordinates(coordMap);
        setIsLoading(false);
    }, [inspections]);

    if (isLoading) {
        return <div>Loading map...</div>;
    }

    // Find center point for the map
    let center: Coordinates;
    if (coordinates.size > 0) {
        // Calculate the average of all coordinates
        const coords = Array.from(coordinates.values());
        const sumLat = coords.reduce((sum, coord) => sum + coord.lat, 0);
        const sumLng = coords.reduce((sum, coord) => sum + coord.lng, 0);
        center = {
            lat: sumLat / coords.length,
            lng: sumLng / coords.length
        };
    } else {
        // Default to center of southern England if no coordinates
        center = { lat: 51.1295, lng: -0.5000 };
    }

    return (
        <div style={{ height: '75vh', width: '100%' }}>
            {coordinates.size === 0 ? (
                <div>No valid locations found for mapping.</div>
            ) : (
                <MapContainer
                    center={[center.lat, center.lng]}
                    zoom={7}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {inspections.map((inspection) => {
                        const coords = coordinates.get(inspection.postcode);
                        if (!coords) return null;

                        return (                            <Marker
                                key={`${inspection.postcode}-${inspection.dueDate}`}
                                position={[coords.lat, coords.lng]}
                                icon={inspection.scheduledInspectionCount > 0 ? scheduledIcon : unscheduledIcon}>                                <Popup>
                                    <strong>{inspection.companyName}</strong>
                                    <br />
                                    Equipment: {inspection.categoryDescription}
                                    <br />
                                    Due Date: {new Date(inspection.dueDate).toLocaleDateString()}
                                    <br />
                                    <span style={{ 
                                        color: inspection.scheduledInspectionCount > 0 ? '#2e7d32' : '#d32f2f',
                                        fontWeight: 'bold'
                                    }}>
                                        {inspection.scheduledInspectionCount > 0 
                                            ? `${inspection.scheduledInspectionCount} Inspection${inspection.scheduledInspectionCount > 1 ? 's' : ''} Scheduled` 
                                            : 'Not Scheduled'}
                                    </span>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            )}
        </div>
    );
};

export default InspectionMap;
