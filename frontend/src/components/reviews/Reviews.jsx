import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { useState, useRef } from "react";
const Reviews = ({ gigId }) => {
  const [rate, setRate] = useState(null);
  const formRef = useRef();
  const toast = useRef(null);
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess:()=>{
      // queryClient.invalidateQueries(["reviews"])
      // Reset form
      setRate(0);
      formRef.current.reset();
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: (error) => {
      // console.error("Mutation error:", error);
      if (
        error.response &&
        error.response.status === 403
      ) {
        toast.current.show({severity:'warn', summary: 'Warning', detail:error.response.data, life: 3000});
      } else {
        toast.current.show({severity:'error', summary: 'Error', detail:error.response.data, life: 3000});
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = rate;
    if(desc && desc.length){
      mutation.mutate({ gigId, desc, star });
    }
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      <Toast ref={toast} />
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        {/* Form should only be visible when the gig was purchased by the logged in user */}
        <form ref={formRef} action="" className="addForm" onSubmit={handleSubmit}>
          <Rating value={rate} onChange={(e) => setRate(e.value)} pt={{
            onIcon: { className: 'text-[#1dbf73]' },
            offIcon: { className: 'text-gray-300' },
          }} />
          <input type="text" placeholder="Write your review" />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
