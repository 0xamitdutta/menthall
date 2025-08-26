
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Github, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function RegisterForm({ isMentor = false }: { isMentor?: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    collegeEmail: "",
    university: "",
  });
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && !showAdditionalFields) {
      router.push('/dashboard');
    }
  }, [status, router, showAdditionalFields]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSSOSignIn = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    const result = await signIn(provider, { redirect: false });
    setIsLoading(false);

    if (result?.error) {
      toast.error(`Sign up with ${provider} failed. Please try again.`);
    } else if (isMentor) {
      setShowAdditionalFields(true);
    } else {
      router.push('/dashboard');
    }
  };

  const handleAdditionalFieldsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Here you would update the user profile with the additional information
      console.log("Submitting additional mentor details:", {
        userId: session?.user.id,
        collegeEmail: formData.collegeEmail,
        university: formData.university,
      });
      // In a real app, you would make an API call here to save the data.
      // For now, we just simulate a successful save.
      toast.success("Your mentor details have been saved.");
      router.push('/dashboard');
    } catch (error) {
      console.error("Error saving additional mentor details:", error);
      toast.error("Failed to save your details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      const endpoint = isMentor ? "/api/auth/signup/mentor" : "/api/auth/signup/mentee";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
          ...(isMentor && {
            collegeEmail: formData.collegeEmail,
            university: formData.university,
          }),
        }),
      });
      
      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully! Please check your email for verification.");
        if (isMentor) {
          router.push(`/auth/verify-otp?email=${encodeURIComponent(formData.email)}&collegeEmail=${encodeURIComponent(formData.collegeEmail)}`);
        } else {
          router.push(`/auth/verify-otp?email=${encodeURIComponent(formData.email)}`);
        }
      } else {
        toast.error(data.message || "An error occurred during sign-up.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
        <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  if (showAdditionalFields) {
    return (
      <form onSubmit={handleAdditionalFieldsSubmit} className="space-y-4 pt-4">
        <div className="space-y-2">
            <Label htmlFor="collegeEmail">College Email</Label>
            <Input
                id="collegeEmail"
                name="collegeEmail"
                type="email"
                placeholder="mentor@university.edu"
                value={formData.collegeEmail}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="university">School/University</Label>
            <Input
                id="university"
                name="university"
                type="text"
                placeholder="e.g., Harvard University"
                value={formData.university}
                onChange={handleInputChange}
                required
            />
        </div>
        <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
        </Button>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {isMentor && (
          <>
            <div className="space-y-2">
              <Label htmlFor="collegeEmail">College Email</Label>
              <Input
                id="collegeEmail"
                name="collegeEmail"
                type="email"
                placeholder="mentor@university.edu"
                value={formData.collegeEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">School/University</Label>
              <Input
                id="university"
                name="university"
                type="text"
                placeholder="e.g., Harvard University"
                value={formData.university}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-full px-3 text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-full px-3 text-gray-400"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
            <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">
            Or continue with
            </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
            variant="outline" 
            className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
            onClick={() => handleSSOSignIn('google')}>
          <Image src="/logos/google.png" alt="Google" width={16} height={16} className="mr-2" />
          Google
        </Button>
        <Button 
            variant="outline" 
            className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
            onClick={() => handleSSOSignIn('github')}>
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
      
      <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-blue-600 hover:underline">
          Sign In
          </Link>
      </p>
    </div>
  );
}
