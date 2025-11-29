import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { motion } from 'framer-motion'
import { adminAPI } from '../lib/api'
import { PhoneCall, Phone, CheckCircle2, MessageSquare, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { LoadingSpinner } from '../components/ui/loading-spinner'
import { Button } from '../components/ui/button'

interface Consultation {
  id: string
  name: string
  phone: string
  reason: string
  createdAt: string
  called: boolean
  adminNotes?: string
}

const AdminConsultations: React.FC = () => {
  const [dateFilter, setDateFilter] = useState<'today' | 'lastWeek' | 'lastMonth' | 'all'>('all')
  const [calledFilter, setCalledFilter] = useState<boolean | 'all'>('all')
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [notesValue, setNotesValue] = useState<string>('')
  const queryClient = useQueryClient()

  const { data: consultations = [], isLoading: consultationsLoading } = useQuery(
    ['allConsultations', dateFilter, calledFilter],
    () => {
      const filters: { dateFilter?: 'today' | 'lastWeek' | 'lastMonth'; called?: boolean } = {}
      if (dateFilter !== 'all') {
        filters.dateFilter = dateFilter
      }
      if (calledFilter !== 'all') {
        filters.called = calledFilter
      }
      return adminAPI.getAllConsultations(filters)
    },
    {
      select: (response) => response.data,
    }
  )

  const updateConsultationMutation = useMutation(
    ({ consultationId, data }: { consultationId: string; data: { called?: boolean; adminNotes?: string } }) =>
      adminAPI.updateConsultation(consultationId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['allConsultations'])
        setEditingNotes(null)
        setNotesValue('')
      },
    }
  )

  const handleMarkAsCalled = (consultationId: string) => {
    updateConsultationMutation.mutate({
      consultationId,
      data: { called: true },
    })
  }

  const handleSaveNotes = (consultationId: string) => {
    updateConsultationMutation.mutate({
      consultationId,
      data: { adminNotes: notesValue },
    })
  }

  const handleStartEditingNotes = (consultation: Consultation) => {
    setEditingNotes(consultation.id)
    setNotesValue(consultation.adminNotes || '')
  }

  const handleCancelEditingNotes = () => {
    setEditingNotes(null)
    setNotesValue('')
  }

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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-white dark:bg-black shadow-lg rounded-lg border border-gray-200 dark:border-gray-800">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Date Filter */}
              <div className="flex-1">
                <label className={`block text-base font-semibold mb-2 ${
                  dateFilter !== 'all' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  Filter by Date
                </label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={dateFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDateFilter('all')}
                    className={dateFilter === 'all' ? 'bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700' : ''}
                  >
                    All
                  </Button>
                  <Button
                    variant={dateFilter === 'today' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDateFilter('today')}
                    className={dateFilter === 'today' ? 'bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700' : ''}
                  >
                    Today
                  </Button>
                  <Button
                    variant={dateFilter === 'lastWeek' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDateFilter('lastWeek')}
                    className={dateFilter === 'lastWeek' ? 'bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700' : ''}
                  >
                    Last 1 Week
                  </Button>
                  <Button
                    variant={dateFilter === 'lastMonth' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDateFilter('lastMonth')}
                    className={dateFilter === 'lastMonth' ? 'bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700' : ''}
                  >
                    1 Month
                  </Button>
                </div>
              </div>

              {/* Called Filter */}
              <div className="flex-1">
                <label className={`block text-base font-semibold mb-2 ${
                  calledFilter !== 'all' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  Filter by Status
                </label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={calledFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCalledFilter('all')}
                    className={calledFilter === 'all' ? 'bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700' : ''}
                  >
                    All
                  </Button>
                  <Button
                    variant={calledFilter === true ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCalledFilter(true)}
                    className={calledFilter === true ? 'bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700' : ''}
                  >
                    Called
                  </Button>
                  <Button
                    variant={calledFilter === false ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCalledFilter(false)}
                    className={calledFilter === false ? 'bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700' : ''}
                  >
                    Not Called
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0 w-full md:w-auto">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-base sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                              {consultation.name}
                            </h3>
                            {consultation.called && (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              <span className="font-medium">{consultation.phone}</span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              {new Date(consultation.createdAt).toLocaleDateString()} at{' '}
                              {new Date(consultation.createdAt).toLocaleTimeString()}
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

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          {!consultation.called && (
                            <Button
                              onClick={() => handleMarkAsCalled(consultation.id)}
                              disabled={updateConsultationMutation.isLoading}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Mark as Called
                            </Button>
                          )}
                          <Button
                            onClick={() => handleStartEditingNotes(consultation)}
                            variant="outline"
                            size="sm"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {consultation.adminNotes ? 'Edit Notes' : 'Add Notes'}
                          </Button>
                        </div>
                      </div>

                      {/* Admin Notes Section */}
                      {editingNotes === consultation.id ? (
                        <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Admin Notes
                          </label>
                          <textarea
                            value={notesValue}
                            onChange={(e) => setNotesValue(e.target.value)}
                            placeholder="Add notes after calling..."
                            className="flex min-h-[80px] w-full rounded-md border border-input dark:border-gray-700 bg-background dark:bg-black text-foreground dark:text-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:focus-visible:ring-gray-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-2 resize-y"
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleSaveNotes(consultation.id)}
                              disabled={updateConsultationMutation.isLoading}
                              size="sm"
                              className="bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700"
                            >
                              Save Notes
                            </Button>
                            <Button
                              onClick={handleCancelEditingNotes}
                              variant="outline"
                              size="sm"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : consultation.adminNotes ? (
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Admin Notes:
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {consultation.adminNotes}
                              </p>
                            </div>
                            <Button
                              onClick={() => handleStartEditingNotes(consultation)}
                              variant="ghost"
                              size="sm"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : null}
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
