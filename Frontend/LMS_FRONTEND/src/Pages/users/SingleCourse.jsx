import { Spinner } from '@/components/ui/spinner'
import { useGetSingleCourseHook } from '@/Hooks/course.hook'
import { usePayment } from '@/Hooks/payment.hook'
import React from 'react'
import { useParams } from 'react-router-dom'

const SingleCourse = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetSingleCourseHook(id)
  const { mutate, isPending } = usePayment()

  const purchaseHandler = (course) => {
    const product = {
      product: {
        _id: course._id,
        name: course.title,
        price: course.amount,
        image: course.thumbnail,
      },
    }
    mutate(product)
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-8">

        {/* Course Image */}
        <div className="flex items-center justify-center">
          <img
            src={data?.thumbnail}
            alt={data?.title}
            className="w-full max-h-[320px] object-contain rounded-xl"
          />
        </div>

        {/* Course Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {data?.title}
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {data?.description || "Upgrade your skills with this professional course."}
            </p>

            {/* <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-emerald-600">
                ₹{data?.amount}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{Number(data?.amount) + 999}
              </span>
            </div> */}
            <div className="mb-8">
  {/* Price */}
  <div className="flex items-center gap-4">
    <span className="text-3xl font-bold text-emerald-600">
      ₹{data?.amount}
    </span>

    <span className="text-sm text-gray-400 line-through">
      ₹{Number(data?.amount) + 999}
    </span>
  </div>

  {/* Stripe Test Card */}
  <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
    <p className="text-sm font-semibold text-amber-800">
      🧪 Stripe Test Mode
    </p>

    <p className="mt-2 text-sm text-amber-700">
      Use this test card to complete the payment.
    </p>

    <div className="mt-3 rounded-lg border border-amber-200 bg-white px-4 py-3">
      <p className="text-lg font-mono font-bold tracking-widest text-slate-900">
        4242 4242 4242 4242
      </p>

      <p className="mt-2 text-xs text-slate-500">
        Expiry: Any future date &nbsp;•&nbsp; CVC: Any 3 digits &nbsp;•&nbsp; ZIP: Any value
      </p>
    </div>
  </div>
</div>
          </div>

          {/* CTA */}
          <button
            disabled={isPending}
            onClick={() => purchaseHandler(data)}
            className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold text-lg
            hover:bg-emerald-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isPending ? <Spinner /> : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleCourse