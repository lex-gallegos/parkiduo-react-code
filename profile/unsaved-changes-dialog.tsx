import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { AlertTriangle, Save, X } from 'lucide-react';

interface UnsavedChangesDialogProps {
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
}

export function UnsavedChangesDialog({ onSave, onDiscard, onCancel }: UnsavedChangesDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-semantic-warn" />
            Cambios sin guardar
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-gray-700">
              Tienes cambios sin guardar en tu perfil. ¿Qué quieres hacer?
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                Si continúas sin guardar, perderás todos los cambios realizados.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={onSave} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Guardar cambios
            </Button>
            
            <Button variant="destructive" onClick={onDiscard} className="w-full">
              <X className="mr-2 h-4 w-4" />
              Descartar cambios
            </Button>
            
            <Button variant="outline" onClick={onCancel} className="w-full">
              Continuar editando
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}