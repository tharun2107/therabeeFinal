import React from 'react'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { adminAPI } from '../lib/api'
import { PhoneCall, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { LoadingSpinner } from '../components/ui/loading-spinner'

interface Consultation {
  id: string
  name: string
  phone: string
  reason: string
  createdAt: string
}

const AdminConsultations: React.FC = () => {
  const { data: consultations = [], isLoading: consultationsLoading } = useQuery(
    'allConsultations',
    adminAPI.getAllConsultations,
    {
      select: (response) => response.data,
    }
  )

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#F9F9F9] dark:bg-black rounded-2xl" />
        <div className="relative p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-white mb-2">
                Consultations
              </h1>
              <p className="text-[#4D4D4D] dark:text-gray-300 text-base sm:text-lg">
                View and manage all consultation requests from parents.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Consultations List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-white dark:bg-black shadow-lg rounded-lg border border-gray-200 dark:border-gray-800">
          <CardHeader className="p-4 sm:p-5 md:p-6 border-b border-gray-200 dark:border-gray-800">
            <CardTitle className="text-lg sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <PhoneCall className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Consultation Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {consultationsLoading ? (
              <div className="text-center py-12">
                <LoadingSpinner />
              </div>
            ) : consultations.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <PhoneCall className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No consultations yet
                </h3>
                <p className="text-sm">Consultation requests will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {consultations.map((consultation: Consultation) => (
                  <motion.div
                    key={consultation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 dark:bg-black dark:from-black dark:to-black dark:border dark:border-gray-800 p-4 sm:p-5 md:p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0 w-full md:w-auto">
                        <h3 className="text-base sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {consultation.name}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            <span className="font-medium">{consultation.phone}</span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {new Date(consultation.createdAt).toLocaleDateString()} at {new Date(consultation.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Reason for Consultation:
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {consultation.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default AdminConsultations

