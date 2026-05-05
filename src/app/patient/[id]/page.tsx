import { notFound } from "next/navigation";
import { patientById, patients } from "@/data/patients";
import { appointments } from "@/data/appointments";
import { providerById } from "@/data/providers";
import { insuranceVerifications } from "@/data/insurance";
import {
  intakeFields,
  medications,
  historyItems,
  aiSummary,
  actionItems,
  reconciliationNote,
  focalPatientId,
} from "@/data/intake";
import { PatientView } from "./PatientView";

export function generateStaticParams() {
  return patients.map((p) => ({ id: p.id }));
}

export default async function PatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = patientById(id);
  if (!patient) notFound();

  // For non-focal patients, we display a slimmed-down version using
  // the same shape — but the focal patient (p-001) has the rich seed.
  const todayAppt = appointments.find((a) => a.patientId === id);
  const provider = todayAppt ? providerById(todayAppt.providerId) : undefined;
  const insurance = insuranceVerifications.find((iv) => iv.patientId === id);

  const isFocal = id === focalPatientId;

  return (
    <PatientView
      patient={patient}
      todayAppt={todayAppt ?? null}
      provider={provider ?? null}
      insurance={insurance ?? null}
      intakeFields={isFocal ? intakeFields : intakeFields}
      medications={isFocal ? medications : medications.slice(0, 5)}
      historyItems={isFocal ? historyItems : historyItems}
      aiSummary={aiSummary}
      actionItems={actionItems}
      reconciliationNote={reconciliationNote}
    />
  );
}
