import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AboutSection = () => (
  <Card className="shadow-xl rounded-4xl border-0">
    <CardHeader>
      <CardTitle>About</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-700 leading-relaxed">
        Hi, I&apos;m a 4th-year Computer Science Engineering student at IIT Bombay,
        passionate about guiding students who aspire to join this prestigious
        institution. Having navigated the journey myself, I can provide
        first-hand tips and practical insights on academics, campus life, and
        the admission process to help you achieve your goals.
      </p>
    </CardContent>
  </Card>
);