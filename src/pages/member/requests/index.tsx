import React from 'react';
import { useVehicleRequestStore } from '../../../store/vehicleRequestStore';
import { useAuthStore } from '../../../store/authStore';
import { useTranslation } from '../../../hooks/useTranslation';
import { formatDate } from '../../../utils/dateUtils';
import { Button } from '../../../components/common/Button';

function MemberRequests() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { requests, fetchUserRequests, updateRequestStatus, isLoading } = useVehicleRequestStore();

  React.useEffect(() => {
    const loadRequests = async () => {
      if (user?.id) {
        console.log('Fetching requests for user:', user.id);
        await fetchUserRequests(user.id);
        console.log('Requests fetched');
      }
    };
    loadRequests();
  }, [user?.id, fetchUserRequests]);

  React.useEffect(() => {
    console.log('Current requests:', requests);
  }, [requests]);

  const handleCancelRequest = async (requestId: string) => {
    try {
      await updateRequestStatus(requestId, 'canceled');
    } catch (error) {
      console.error('Failed to cancel request:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('Meine Anfragen')}</h1>

      {requests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">{t('Keine Anfragen vorhanden')}</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {requests.map((request) => (
              <li key={request.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900">
                        {request.vehicle.make} {request.vehicle.model}
                      </h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span className="truncate">
                          {t('Laufzeit')}: {request.requestDetails.leaseDuration} {t('Monate')} |{' '}
                          {t('Laufleistung')}: {request.requestDetails.mileageLimit} km/Jahr
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {t('Farbe')}: {request.requestDetails.selectedColor}
                      </div>
                    </div>
                    <div className="ml-6 flex-shrink-0">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                          request.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : request.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : request.status === 'canceled'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {t(request.status === 'canceled' ? 'Zurückgezogen' : request.status)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {t('Angefragt am')}: {formatDate(request.createdAt)}
                    </span>
                    {request.status === 'pending' && (
                      <Button
                        variant="outline"
                        onClick={() => handleCancelRequest(request.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        {t('Zurückziehen')}
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MemberRequests;
