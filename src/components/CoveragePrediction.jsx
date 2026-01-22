export default function CoveragePrediction() {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2">Coverage Prediction</h3>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-red-500 h-3 rounded-full w-[35%]" />
      </div>

      <p className="text-sm mt-2 text-gray-600">
        ⏳ Coverage may run out in <b>1.3 months</b>
      </p>
    </div>
  );
}