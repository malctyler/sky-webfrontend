import axios from 'axios';
import { baseUrl } from '../config';
import { CreateInspectorDto, Inspector, InspectorResponse, InspectorsResponse, UpdateInspectorDto } from '../types/inspectorTypes';

const getToken = (): string | null => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  try {
    return JSON.parse(user).token;
  } catch {
    return null;
  }
};

const getAll = async (): Promise<Inspector[]> => {
  const token = getToken();
  try {
    const response = await axios.get<InspectorsResponse>(`${baseUrl}/inspectors`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
      console.log('Raw inspector API response:', JSON.stringify(response.data, null, 2));

    if (!response.data) {
      console.error('No data received from inspector API');
      return [];
    }

    // Extract the array of inspectors from the response
    const inspectorData = Array.isArray(response.data) ? response.data : [];

    // Debug log each inspector
    inspectorData.forEach((inspector, index) => {
      console.log(`Inspector ${index} data:`, {
        rawData: inspector,
        properties: Object.keys(inspector),
        inspectorID: inspector.inspectorID,
        inspectorsName: inspector.inspectorsName
      });
    });

    // Transform and validate each inspector with detailed logging
    const transformedInspectors = inspectorData
      .filter(inspector => {
        const isValid = inspector && 
          typeof inspector === 'object' &&
          typeof inspector.inspectorID === 'number' &&
          typeof inspector.inspectorsName === 'string';

        if (!isValid) {
          console.log('Inspector validation failed:', {
            inspector,
            hasInspectorID: inspector?.inspectorID !== undefined,
            inspectorIDType: typeof inspector?.inspectorID,
            hasInspectorsName: inspector?.inspectorsName !== undefined,
            inspectorsNameType: typeof inspector?.inspectorsName
          });
        }

        return isValid;
      });

    console.log('Transformed inspectors:', transformedInspectors);
    return transformedInspectors;
  } catch (error) {
    console.error('Error fetching inspectors:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
    return [];
  }
};

const getById = async (id: number): Promise<Inspector> => {
  const token = getToken();
  const response = await axios.get<InspectorResponse>(`${baseUrl}/inspectors/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const create = async (inspector: CreateInspectorDto): Promise<Inspector> => {
  const token = getToken();
  const response = await axios.post<InspectorResponse>(`${baseUrl}/inspectors`, inspector, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const update = async (id: number, inspector: UpdateInspectorDto): Promise<Inspector> => {
  const token = getToken();
  const response = await axios.put<InspectorResponse>(`${baseUrl}/inspectors/${id}`, inspector, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const remove = async (id: number): Promise<void> => {
  const token = getToken();
  await axios.delete(`${baseUrl}/inspectors/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

const inspectorService = {
  getAll,
  getById,
  create,
  update,
  remove
};

export default inspectorService;
