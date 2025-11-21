import React, { useState } from 'react'
import { X, Phone, User, FileText, Loader2, PhoneCall, Mail } from 'lucide-react'
import { Button } from './ui/button'
import toast from 'react-hot-toast'

interface BookConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

// Contact information from footer
const CONTACT_INFO = {
  phone: '+91 97000 26056',
  email: 'Therabee25@gmail.com',
}

const BookConsultationModal: React.FC<BookConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    reason: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name')
      return
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number')
      return
    }
    if (!formData.reason.trim()) {
      toast.error('Please enter the reason for consultation')
      return
    }

    setSubmitting(true)
    try {
      const { consultationAPI } = await import('../lib/api')
      await consultationAPI.createConsultation(formData)
      toast.success('Consultation request submitted successfully! We will contact you soon.')
      // Reset form
      setFormData({
        name: '',
        phone: '',
        reason: '',
      })
      onClose()
    } catch (error: any) {
      console.error('Error submitting consultation:', error)
      toast.error(error.message || 'Failed to submit consultation request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!submitting) {
      setFormData({
        name: '',
        phone: '',
        reason: '',
      })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-black rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <PhoneCall className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
            Book Free Consultation
          </h2>
          <button
            onClick={handleClose}
            disabled={submitting}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 bg-white dark:bg-black">
          {/* Contact Information */}
          <div className="bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Want a Free Consultation?
              </h3>
              <p className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Call Now at
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 shadow-sm">
                <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div className="text-center flex-1">
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="text-lg font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 shadow-sm">
                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div className="text-center flex-1">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-lg font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors break-all"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4 italic">
              Or fill out the form below and we'll get back to you!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <User className="h-4 w-4 inline mr-1" />
                Parent Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter your full name"
                disabled={submitting}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Phone className="h-4 w-4 inline mr-1" />
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter your phone number"
                disabled={submitting}
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <FileText className="h-4 w-4 inline mr-1" />
                Reason for Consultation <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                placeholder="Please describe the reason for consultation..."
                disabled={submitting}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={submitting}
                className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Consultation Request'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookConsultationModal

