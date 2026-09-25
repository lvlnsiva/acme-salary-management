module Api
  module V1
    class SalariesController < ApplicationController
      before_action :set_employee

      def index
        salaries = @employee.salaries.order(effective_from: :desc)

        render json: salaries
      end

      def create
        salary = @employee.salaries.new(salary_params)

        if salary.save
          render json: salary, status: :created
        else
          render json: { errors: salary.errors.to_hash }, status: :unprocessable_entity
        end
      end

      private

      def set_employee
        @employee = Employee.find(params[:employee_id])
      end

      def salary_params
        params.require(:salary).permit(
          :amount,
          :currency,
          :effective_from,
          :effective_to
        )
      end
    end
  end
end
