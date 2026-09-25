module Api
  module V1
    class EmployeesController < ApplicationController
      def index
        employees = Employee.all

        employees = employees.where(
          "first_name ILIKE :search OR last_name ILIKE :search OR email ILIKE :search OR employee_number ILIKE :search",
          search: "%#{params[:search]}%"
        ) if params[:search].present?

        employees = employees.where(country_id: params[:country]) if params[:country].present?
        employees = employees.where(department_id: params[:department]) if params[:department].present?

        page = [params.fetch(:page, 1).to_i, 1].max
        per_page = [[params.fetch(:per_page, 20).to_i, 1].max, 100].min

        total_count = employees.count

        employees = employees
          .includes(:country, :department, :current_salary)
          .order(:id)
          .limit(per_page)
          .offset((page - 1) * per_page)

        render json: {
          data: employees.as_json(
            include: {
              country: { only: [:id, :name] },
              department: { only: [:id, :name] },
              current_salary: { only: [:amount, :currency] }
            }
          ),
          meta: {
            page: page,
            per_page: per_page,
            total_count: total_count,
            total_pages: (total_count.to_f / per_page).ceil
          }
        }
      end

      def show
        employee = Employee.find(params[:id])
        render json: employee
      end

      def create
        employee = Employee.new(employee_params)

        if employee.save
          render json: employee, status: :created
        else
          render json: { errors: employee.errors }, status: :unprocessable_entity
        end
      end

      def update
        employee = Employee.find(params[:id])

        if employee.update(employee_params)
          render json: employee
        else
          render json: { errors: employee.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        employee = Employee.find(params[:id])
        employee.destroy

        head :no_content
      end

      private

      def employee_params
        params.require(:employee).permit(
          :employee_number,
          :first_name,
          :last_name,
          :email,
          :country_id,
          :department_id,
          :job_title,
          :employment_status
        )
      end
    end
  end
end
