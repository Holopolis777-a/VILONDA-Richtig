import React from 'react';
import { useVehicleRequestStore } from '../../../store/vehicleRequestStore';
import { useTranslation } from '../../../hooks/useTranslation';
import { formatDate } from '../../../utils/dateUtils';
import { Button } from '../../../components/common/Button';

function AdminVehicleRequests() {
  const { t } = useTranslation();
  const { requests, fetchAllRequests, updateRequestStatus, isLoading } = useVehicleRequestStore();

  React.useEffect(() => {
    console.log('Admin: Fetching all requests');
    fetchAllRequests();
  }, [fetchAllRequests]);

  React.useEffect(() => {
    console.log('Admin: Current requests:', requests);
  }, [requests]);

  const handleUpdateStatus = async (requestId: string, status: 'approved' | 'rejected') => {
    try {
      console.log('Admin: Updating request status:', requestId, status);
      await updateRequestStatus(requestId, status);
      console.log('Admin: Status updated, fetching all requests');
      await fetchAllRequests();
    } catch (error) {
      console.error('Failed to update request status:', error);
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
      <h1 className="text-2xl font-bold mb-6">{t('Neue Bestellungen')}</h1>

      {requests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">{t('Keine Anfragen vorhanden')}</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {requests.map((request) => (
              <li key={request.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {request.vehicle.make} {request.vehicle.model}
                      </h3>
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

                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div>
                        <p className="font-medium text-gray-700">{t('Fahrzeugdetails')}</p>
                        <p>{t('Typ')}: {request.vehicle.type}</p>
                        <p>{t('Baujahr')}: {request.vehicle.year}</p>
                        <p>{t('Kraftstoff')}: {request.vehicle.fuelType}</p>
                        <p>{t('Leistung')}: {request.vehicle.power} PS</p>
                      </div>

                      <div>
                        <p className="font-medium text-gray-700">{t('Anfragendetails')}</p>
                        <p>{t('Laufzeit')}: {request.requestDetails.leaseDuration} {t('Monate')}</p>
                        <p>{t('Laufleistung')}: {request.requestDetails.mileageLimit} km/Jahr</p>
                        <p>{t('Farbe')}: {request.requestDetails.selectedColor}</p>
                        <p>{t('Services')}: {request.requestDetails.selectedServices.join(', ') || t('Keine')}</p>
                      </div>

                      <div className="col-span-2">
                        <p className="font-medium text-gray-700">{t('Kundendetails')}</p>
                        <p>{t('Name')}: {request.user.name}</p>
                        <p>{t('Email')}: {request.user.email}</p>
                        <p>{t('Angefragt am')}: {formatDate(request.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {request.status === 'pending' && (
                  <div className="mt-4 flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus(request.id, 'rejected')}
                    >
                      {t('Ablehnen')}
                    </Button>
                    <Button
                      onClick={() => handleUpdateStatus(request.id, 'approved')}
                    >
                      {t('Genehmigen')}
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminVehicleRequests;
