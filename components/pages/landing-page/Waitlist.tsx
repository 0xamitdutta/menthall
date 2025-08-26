'use client'
import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import Image from 'next/image'
import {
    Users,
    MessageSquare,
    Sparkles,
    ChevronRight,
    Mail,
    CheckCircle
} from 'lucide-react'

const Waitlist = () => {
    const [email, setEmail] = useState('')
    const [mentorEmail, setMentorEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isMentorSubmitted, setIsMentorSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isMentorLoading, setIsMentorLoading] = useState(false)

    const handleStudentSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) {
            toast.error('Please enter your email address.')
            return
        }
        setIsLoading(true)

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, is_mentor: false }),
            })

            const data = await response.json()

            if (response.ok) {
                toast.success('Welcome to the community! Check your inbox for a confirmation.')
                setIsSubmitted(true)
                setEmail('')
            } else {
                toast.error(data.message || 'Something went wrong. Please try again.')
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleMentorSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!mentorEmail) {
            toast.error('Please enter your email address.')
            return
        }
        setIsMentorLoading(true)

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: mentorEmail, is_mentor: true }),
            })

            const data = await response.json()

            if (response.ok) {
                toast.success('Welcome to the mentor network! Check your inbox for a confirmation.')
                setIsMentorSubmitted(true)
                setMentorEmail('')
            } else {
                toast.error(data.message || 'Something went wrong. Please try again.')
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.')
        } finally {
            setIsMentorLoading(false)
        }
    }

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    }

    const floatingVariants: Variants = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    const features = [
        {
            icon: Users,
            title: "Expert Mentors",
            description: "Connect with students from top colleges"
        },
        {
            icon: MessageSquare,
            title: "Personalized Advice",
            description: "Get tailored guidance for your journey"
        },
        {
            icon: Sparkles,
            title: "Diverse Perspectives",
            description: "Learn from mentors across all fields"
        }
    ]
    return (
        <div className="mx-auto mt-8 text-center space-y-8">
            <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
                <Sparkles className="w-4 h-4" />
                Coming Soon
            </motion.div>


            {/* Signup Sections - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 lg:gap-64 mx-auto max-w-7xl mb-8">
                {/* Student Section - Left Side */}

                <motion.div variants={itemVariants} className="w-full">
                    <div className="space-y-4 mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Your Bridge to{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                College Success
                            </span>
                        </h2>
                        <p className="text-base text-gray-600">
                            Connect with experienced mentors from diverse colleges for personalised advice. Navigate your college journey with confidence.
                        </p>
                    </div>
                    <Card className="p-6 bg-white/90 backdrop-blur-md shadow-xl border-0">
                        {!isSubmitted ? (
                            <form onSubmit={handleStudentSubmit} className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Join Our Community
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Be the first to know when we launch
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="pl-10 bg-gray-50 border-gray-200"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                />
                                                Joining...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Join Waitlist
                                                <ChevronRight className="w-4 h-4" />
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center py-4"
                            >
                                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                                <h3 className="text-lg font-semibold text-gray-900 ">
                                    Welcome to the Community!
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    We've sent a confirmation email to you.
                                </p>
                            </motion.div>
                        )}
                    </Card>
                </motion.div>

                {/* Mentor Section - Right Side */}
                <motion.div variants={itemVariants} className="w-full">
                    <div className="space-y-4 mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Ready to Share Your{' '}
                            <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                                Wisdom?
                            </span>
                        </h2>
                        <p className="text-base text-gray-600">
                            Join our community of mentors from top colleges. Guide aspiring students, share your journey, and make a lasting impact on their future success.
                        </p>
                    </div>
                    <Card className="p-6 bg-white/90 backdrop-blur-md shadow-xl border-0">
                        {!isMentorSubmitted ? (
                            <form onSubmit={handleMentorSubmit} className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Join Our Mentor Network
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Be the first to get access when we launch for mentors.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={mentorEmail}
                                            onChange={(e) => setMentorEmail(e.target.value)}
                                            required
                                            className="pl-10 bg-gray-50 border-gray-200"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isMentorLoading}
                                        className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg"
                                    >
                                        {isMentorLoading ? (
                                            <span className="flex items-center gap-2">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                />
                                                Joining...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Join as a Mentor
                                                <ChevronRight className="w-4 h-4" />
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center py-4"
                            >
                                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Welcome to the Mentor Network!
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    We've sent a confirmation email to you.
                                </p>
                            </motion.div>
                        )}
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

export default Waitlist