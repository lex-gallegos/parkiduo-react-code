import { useState, useEffect } from "react";
import { AuthCard } from "./auth-card";
import { Button } from "../ui/button";
import { toast } from "sonner@2.0.3";
import { Shield, Clock, Mail } from "lucide-react";

interface AccountBlockedPageProps {
  onNavigate: (page: string, options?: any) => void;
  blockedUntil?: Date;
  reason?: "attempts" | "security" | "abuse";
  email?: string;
}

export function AccountBlockedPage({
  onNavigate,
  blockedUntil,
  reason = "attempts",
  email,
}: AccountBlockedPageProps) {
  const [timeRemaining, setTimeRemaining] = useState<{
    minutes: number;
    seconds: number;
  }>({ minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!blockedUntil) return;

    const updateTimer = () => {
      const now = new Date();
      const diff = blockedUntil.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining({ minutes: 0, seconds: 0 });
        return;
      }

      const minutes = Math.floor(diff / 1000 / 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeRemaining({ minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [blockedUntil]);

  const handleContactSupport = () => {
    // In real app, this would open a support ticket or email
    toast.info("Redirigiendo a soporte...");
    setTimeout(() => {
      window.open(
        "mailto:soporte@parkiduo.com?subject=Cuenta%20Bloqueada",
        "_blank",
      );
    }, 1000);
  };

  const handleRetryLogin = () => {
    if (
      timeRemaining.minutes === 0 &&
      timeRemaining.seconds === 0
    ) {
      onNavigate("login");
    } else {
      toast.error(
        "Aún no puedes intentarlo. Espera a que termine el tiempo de bloqueo.",
      );
    }
  };

  const getBlockedContent = () => {
    switch (reason) {
      case "attempts":
        return {
          title: "Cuenta temporalmente bloqueada",
          subtitle: "Demasiados intentos de inicio de sesión",
          description:
            "Por tu seguridad, hemos bloqueado temporalmente el acceso a tu cuenta debido a múltiples intentos fallidos de inicio de sesión.",
          icon: Shield,
          iconColor: "text-semantic-warn",
        };
      case "security":
        return {
          title: "Verificación de seguridad requerida",
          subtitle: "Actividad sospechosa detectada",
          description:
            "Hemos detectado actividad inusual en tu cuenta. Por seguridad, necesitamos verificar tu identidad antes de continuar.",
          icon: Shield,
          iconColor: "text-semantic-danger",
        };
      case "abuse":
        return {
          title: "Cuenta suspendida",
          subtitle: "Violación de términos de servicio",
          description:
            "Tu cuenta ha sido suspendida por violación de nuestros términos de servicio. Contacta con soporte para más información.",
          icon: Shield,
          iconColor: "text-semantic-danger",
        };
      default:
        return {
          title: "Acceso restringido",
          subtitle: "Cuenta bloqueada",
          description:
            "Tu cuenta está temporalmente bloqueada. Contacta con soporte si necesitas ayuda.",
          icon: Shield,
          iconColor: "text-gray-500",
        };
    }
  };

  const content = getBlockedContent();
  const isTemporary = reason === "attempts" && blockedUntil;
  const canRetry =
    timeRemaining.minutes === 0 && timeRemaining.seconds === 0;

  return (
    <AuthCard title={content.title} subtitle={content.subtitle}>
      <div className="text-center space-y-6">
        {/* Icon */}
        <div
          className={`w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center`}
        >
          <content.icon
            className={`w-8 h-8 ${content.iconColor}`}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="text-gray-700">{content.description}</p>

          {email && (
            <p className="text-sm text-gray-600">
              Cuenta: <strong>{email}</strong>
            </p>
          )}
        </div>

        {/* Timer for temporary blocks */}
        {isTemporary && (
          <div className="p-4 bg-semantic-warn/10 border border-semantic-warn/20 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-semantic-warn" />
              <span className="text-sm font-medium text-semantic-warn">
                Tiempo restante
              </span>
            </div>

            {canRetry ? (
              <p className="text-sm text-semantic-success font-medium">
                ¡Ya puedes intentar acceder de nuevo!
              </p>
            ) : (
              <p className="text-lg font-mono text-semantic-warn">
                {String(timeRemaining.minutes).padStart(2, "0")}
                :
                {String(timeRemaining.seconds).padStart(2, "0")}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          {isTemporary && (
            <Button
              onClick={handleRetryLogin}
              disabled={!canRetry}
              className="w-full"
              variant={canRetry ? "default" : "outline"}
            >
              {canRetry ? "Intentar de nuevo" : "Esperando..."}
            </Button>
          )}

          <Button
            variant="outline"
            onClick={handleContactSupport}
            className="w-full"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contactar soporte
          </Button>

          {reason !== "abuse" && (
            <Button
              variant="ghost"
              onClick={() => onNavigate("forgot-password")}
              className="w-full"
            >
              ¿Olvidaste tu contraseña?
            </Button>
          )}
        </div>

        {/* Help text */}
        <div className="pt-4 border-t text-sm text-gray-500">
          {reason === "attempts" && (
            <div>
              <p className="font-medium mb-2">
                Consejos de seguridad:
              </p>
              <ul className="space-y-1 text-xs">
                <li>
                  • Verifica que tu contraseña sea correcta
                </li>
                <li>• Usa el enlace "Olvidé mi contraseña"</li>
                <li>
                  • Asegúrate de que tu email sea correcto
                </li>
              </ul>
            </div>
          )}

          {reason === "security" && (
            <div>
              <p className="font-medium mb-2">
                Medidas de protección:
              </p>
              <ul className="space-y-1 text-xs">
                <li>
                  • Cambiar contraseña si fue comprometida
                </li>
                <li>• Revisar dispositivos conectados</li>
                <li>• Activar verificación en dos pasos</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </AuthCard>
  );
}